var electron = require('electron-prebuilt');
var proc = require('child_process');

var child = proc.spawn(electron, ['electron.js']);

child.stderr.pipe(process.stderr);
child.stdout.pipe(process.stdout);