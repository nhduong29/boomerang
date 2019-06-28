'use strict';

const EVENT_LOAD_DIRECTOTY = "dirApi";
const EVENT_SAVE = "save";
const EVENT_SAVE_ERROR = 'save-error';
const EVENT_SAVE_SUCESS = 'save-sucess'
const EVENT_REQUEST_READ_FILE = 'readApiFile';
const EVENT_READING_FILE = 'api';
const EVENT_OPTION_LINE = 'options:lines';
const EVENT_HIDE_TOPBAR = 'options:hide-topbar';
const EVENT_NO_INDENT = 'options:no-indent';
const EVENT_HIGHLIGHT = 'options:highlightConfig';
const EVENT_READ_LINE = 'line';

const connect = require('connect');
const cookieParser = require('cookie');
const crypto = require('crypto');
const path = require('path');
const socketio = require('socket.io');
const tail = require('./lib/tail');
const connectBuilder = require('./lib/connect_builder');
const program = require('./lib/options_parser');
const serverBuilder = require('./lib/server_builder');
const daemonize = require('./lib/daemonize');
const fs = require('fs');
const untildify = require('untildify');
var dirTree  = require('directory-tree');
var querystring = require('querystring');

/**
 * Parse args
 */
program.parse(process.argv);
if (program.args.length === 0) {
  console.error('Arguments needed, use --help');
  process.exit();
}

/**
 * Validate params
 */
const doAuthorization = !!(program.user && program.password);
const doSecure = !!(program.key && program.certificate);
const sessionSecret = String(+new Date()) + Math.random();
const sessionKey = 'sid';
const files = program.args.join(' ');
const filesNamespace = crypto.createHash('md5').update(files).digest('hex');

if (program.daemonize) {
  daemonize(__filename, program, {
    doAuthorization,
    doSecure,
  });
} else {
  /**
   * HTTP(s) server setup
   */
  const appBuilder = connectBuilder();
  if (doAuthorization) {
    appBuilder.session(sessionSecret, sessionKey);
    appBuilder.authorize(program.user, program.password);
  }

  appBuilder.about(path.join(__dirname, 'web/about.html'), files, filesNamespace, program.theme);
  appBuilder.contact(path.join(__dirname, 'web/contact.html'), files, filesNamespace, program.theme);
  appBuilder.advance(path.join(__dirname, 'web/advance.html'), files, filesNamespace, program.theme);
  appBuilder.api(path.join(__dirname, 'web/api.html'), files, filesNamespace, program.theme);
  appBuilder.static(path.join(__dirname, 'web/assets'))
            .index(path.join(__dirname, 'web/index.html'), files, filesNamespace, program.theme);

  const builder = serverBuilder();
  if (doSecure) {
    builder.secure(program.key, program.certificate);
  }
  const server = builder
    .use(appBuilder.build())
    .port(program.port)
    .host(program.host)
    .build();

  /**
   * socket.io setup
   */
  const io = socketio.listen(server, {
    log: false,
  });

  if (doAuthorization) {
    io.use((socket, next) => {
      const handshakeData = socket.request;
      if (handshakeData.headers.cookie) {
        const cookies = cookieParser.parse(handshakeData.headers.cookie);
        const sessionIdEncoded = cookies[sessionKey];
        if (!sessionIdEncoded) {
          return next(new Error('Session cookie not provided'), false);
        }
        const sessionId = connect.utils.parseSignedCookie(sessionIdEncoded, sessionSecret);
        if (sessionId) {
          return next(null);
        }
        return next(new Error('Invalid cookie'), false);
      }

      return next(new Error('No cookie in header'), false);
    });
  }

  /**
   * Setup UI highlights
   */
  let highlightConfig;
  if (program.uiHighlight) {
    let presetPath;

    if (!program.uiHighlightPreset) {
      presetPath = path.join(__dirname, 'preset/default.json');
    } else {
      presetPath = path.resolve(untildify(program.uiHighlightPreset));
    }

    if (fs.existsSync(presetPath)) {
      highlightConfig = JSON.parse(fs.readFileSync(presetPath));
    } else {
      throw new Error(`Preset file ${presetPath} doesn't exists`);
    }
  }

  /**
   * When connected send starting data
   */
  const tailer = tail(program.args, {
    buffer: program.number,
  });

  const baseFolder = program.base ? program.base : 'services';

  const mainFileJS = baseFolder + '/main.js';

  const filesSocket = io.of(`/${filesNamespace}`).on('connection', (socket) => {
    socket.emit(EVENT_OPTION_LINE, program.lines);
    if (program.uiHideTopbar) {
      socket.emit(EVENT_HIDE_TOPBAR);
    }

    if (!program.uiIndent) {
      socket.emit(EVENT_NO_INDENT);
    }

    if (program.uiHighlight) {
      socket.emit(EVENT_HIGHLIGHT, highlightConfig);
    }

    tailer.getBuffer().forEach((line) => {
      socket.emit('line', line);
    });

    const tree = dirTree('services');

    socket.emit(EVENT_LOAD_DIRECTOTY, tree);

    fs.stat(mainFileJS, function(err, fileStat) {
      getFiles(err, fileStat, mainFileJS, socket);
    });

    socket.on(EVENT_SAVE, function (fileName,data) {
      fs.writeFile(fileName, data, function (err) {
        if (err){
          socket.emit(EVENT_SAVE_ERROR, "Something wrong, File is not saved!");
          throw err;
        }
        console.log(fileName + ' is modify by ' + socket.request.connection.remoteAddress + '. It is Saved!!!');
        socket.emit(EVENT_SAVE_SUCESS, "File is saved!");
      });
    });

    socket.on(EVENT_REQUEST_READ_FILE, function (fileName) {
      fs.stat(fileName, function(err, fileStat) {
        getFiles(err, fileStat, fileName, socket);
      });
    });

  });

  /**
   * Send incoming data
   */
  tailer.on(EVENT_READ_LINE, (line) => {
    filesSocket.emit(EVENT_READ_LINE, line);
  });

  /**
   * Handle signals
   */
  const cleanExit = () => {
    process.exit();
  };
  process.on('SIGINT', cleanExit);
  process.on('SIGTERM', cleanExit);

  const sandbox_command = 'java -jar ' + program.sandbox +'/sandbox-1.0-all.jar --port='+program.sandboxPort + ' --base=' + baseFolder + ' run';

  console.log(sandbox_command);
  /*run the sandbox service*/
  var exec = require('child_process').exec;
  exec(sandbox_command,
    function (error, stdout, stderr){
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if(error !== null){
        console.log('exec error: ' + error);
      }else{
        console.log("Sandbox runtime starting...");
        console.log("Sandbox runtime Details: ");
        console.log("Sandbox runtime directory: " + program.sandbox);
        console.log("Jar file: sandbox-1.0-all.jar");
        console.log("Port: " + program.sandboxPort);
        console.log("Base directory: " + program.base);
      }
  });
}

function getFiles(err, fileStat, fileName, socket) {
  if (err) {
    if (err.code == 'ENOENT') {
      console.log('Does not exist.');
    }
  }else {
    if (fileStat.isFile()) {
      fs.readFile(fileName, 'utf8', function (err, fileContents) {
        if (err)
          throw err;
        var fileObj = {
          "fileName": fileName,
          "fileContents": fileContents
        };
        socket.emit(EVENT_READING_FILE, fileObj);
      });
    }
  }
}
