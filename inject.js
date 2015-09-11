// not really doing anything here

var connect = chrome.runtime.connect({
    name: 'inject'
});

connect.onMessage.addListener(function(message) {
    console.log('inject received', message);
});

// connect.postMessage({targets: f1targets});