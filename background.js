/* global chrome */



chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: 'states',
  title: 'Edit States',
  contexts: ['page'],
  onclick: function(info, tab) {
    console.log('clicked');
  }
});

chrome.contextMenus.create({
  id: 'transitions',
  title: 'Edit Transitions',
  contexts: ['page'],
  onclick: function(info, tab) {
    console.log('clicked');
  }
});





var ports = {};
var tabData = {};

chrome.runtime.onConnect.addListener(function(connection) {

  var tabID = connection.sender.tab.id;
  var listener;

  console.log(connection);

  console.log('got a connection', connection.name);

  if(connection.name === 'devtools') {

    listener = onDevToolsMessage;
  } else if(connection.name === 'inject') {

    listener = onInjectMessage;
  }

  if(listener) {

    if(ports === undefined) {
      ports = {}; 
    }

    ports[ connection.name ] = connection;

    connection.onMessage.addListener(listener);
    connection.onDisconnect.addListener(function() {
      connection.onMessage.removeListener(listener);

      delete ports[ connection.name ];
    });

    if(tabData[ tabID ]) {

      // now send any data saved for this current tab
      connection.postMessage(tabData[ tabID ]);
    } else {

      tabData[ tabID ] = {};
    }
  }
});

function addDataToTab(tabID, data) {

  for(var i in data) {
    tabData[ tabID ][ i ] = data[ i ];
  }
}

function onDevToolsMessage(message, connection) {
  
  console.log('---->', arguments);

  var tabID = connection.sender.tab.id;

  // resend the targets to the inject script
  if(message.targets) {

    addDataToTab(tabID, message);

    console.log('inject port', ports.inject, message);
    console.log('ports', ports);

    if(ports.inject) {
      ports.inject.postMessage(message);  
    }
  }
}

function onInjectMessage(message, sender, sendResponse) {
  console.log('from inject', message);
}