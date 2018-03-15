# sandbox-tail – Streaming logs of sandbox API to the browser

```sandbox-tail``` is a Node.js application for streaming logs to the browser. It's a `tail -F` with UI. It's cloned from [https://github.com/mthenw/frontail](https://github.com/mthenw/frontail). Modify to parse the log from sandbox runtime project [https://github.com/getsandbox/sandbox](https://github.com/getsandbox/sandbox)

## Options
- `-s` or `--sandbox` is the place of sandbox service
- `-x` or `--sandbox-port` is the port of sandbox service

## Dependencies
- ```NodeJs```  important! you actually might not have this.
- ```tail``` the Unix command line to read the content of file. On windows you must install manualy the tail package or using ```git bash``` to run the command

## Usage
- `npm install`
- `node index.js --port=9004 log/debug.log -s 'sandbox-lib' -x 9003`
- Web interface runs on [http://localhost:9004](http://127.0.0.1:9004)

License
----

MIT
