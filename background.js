/* global chrome */

// this might be overkill
// easier to eval in the panel script

// var onMessageListener = function(request, sender, sendResponse) {
//   console.log('request received', request);
//   switch(request.type) {
//     case 'updateStates':
//       console.log('updateStates: ', request.targetId, request.value);
//     break;
//   }
//   return true;
// };

// chrome.runtime.onMessage.addListener(onMessageListener);

// console.log('background.js is doing something');

// chrome.runtime.onMessage.addListener(function (message) {
//   console.log('message', message);
// });

// chrome.runtime.onConnect.addListener(function(devToolsPort) {

//   devToolsPort.onMessage.addListener(registerInspectedTabId);

//   function registerInspectedTabId(inspectedTabId) {

//     devToolsPort.postMessage({
//       event: 'hydrate',
//       data: 'blah'
//     });

//     devToolsPort.onDisconnect.addListener(function () {
//       console.log('disconnected');
//     });

//   }

// });