'use strict';

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
  appBuilder.api(path.join(__dirname, 'web/api.html'), files, filesNamespace, program.theme);
  appBuilder
    .static(path.join(__dirname, 'web/assets'))
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

  const mainFileJS = program.base ?  (program.base + '/main.js') : 'services/main.js';

  const filesSocket = io.of(`/${filesNamespace}`).on('connection', (socket) => {
    socket.emit('options:lines', program.lines);

    if (program.uiHideTopbar) {
      socket.emit('options:hide-topbar');
    }

    if (!program.uiIndent) {
      socket.emit('options:no-indent');
    }

    if (program.uiHighlight) {
      socket.emit('options:highlightConfig', highlightConfig);
    }

    tailer.getBuffer().forEach((line) => {
      socket.emit('line', line);
    });

    const tree = dirTree('services');

    socket.emit('dirApi', tree);

    fs.stat(mainFileJS, function(err, fileStat) {
        if (err) {
            if (err.code == 'ENOENT') {
                console.log('Does not exist.' + mainFileJS);
            }
        } else {
            if (fileStat.isFile()) {
                fs.readFile(mainFileJS, 'utf8', function(err, fileContents) {
                  if (err) throw err;
                  socket.emit('api', fileContents);
              });
            }
        }
    });

    socket.on('save', function (fileName,data) {
      fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log(fileName + ' is modify by ' + socket.request.connection.remoteAddress + '. It is Saved!!!');
      });
    });

    socket.on('readApiFile', function (fileName) {
      fs.stat(fileName, function(err, fileStat) {
        if (err) {
            if (err.code == 'ENOENT') {
                console.log('Does not exist.');
            }
        } else {
            if (fileStat.isFile()) {
                fs.readFile(fileName, 'utf8', function(err, fileContents) {
                  if (err) throw err;
                  socket.emit('api', fileContents);
              });
            }
        }
      });
    });

  });

  /**
   * Send incoming data
   */
  tailer.on('line', (line) => {
    filesSocket.emit('line', line);
  });

  /**
   * Handle signals
   */
  const cleanExit = () => {
    process.exit();
  };
  process.on('SIGINT', cleanExit);
  process.on('SIGTERM', cleanExit);

  const sandbox_command = 'java -jar ' + program.sandbox +'/sandbox-1.0-all.jar --port='+program.sandboxPort + (program.base ? ' --base=' + program.base + ' ': ' ') + 'run';

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
