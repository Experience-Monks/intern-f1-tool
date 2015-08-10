var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var watchify = require('watchify');
var browserify = require('browserify');
var path = require('path');
var fs = require('fs');
var babelify = require('babelify');

var bify = null; // browserify instance
var wify = null; // watchify instance
var mainWindow = null; // electron window

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  
  initBrowserify();
});

function initBrowserify() {

  bify = browserify(path.join(__dirname, 'client.js'), { debug: true });
  wify = watchify(bify, { delay: 0 });
  wify.transform(babelify.configure({
    extensions: ['.js', '.es', '.es6', '.jsx', '.react.js']
  }));

  wify.on('update', function() {

    bundle();
  });

  bundle();

  function bundle() {

    var bundlePath = path.join(__dirname, 'bundle.js');
    var b = wify.bundle();

    b.on('error', function(err) {

      fs.writeFile(bundlePath, 'console.error("' + err + '")', openIndex);
    });

    b.on('end', function() {

      openIndex();
    });

    b.pipe(fs.createWriteStream(bundlePath));
  }
}

function openIndex() {

  if(!mainWindow) {

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  }

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
}