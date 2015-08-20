/* global chrome */

import Vue from 'vue';
import domready from 'domready';
import _ from 'lodash';

import inspectElement from './inspect-element/inspect-element.js';

domready(function () {
  window.app = new Vue({ // eslint-disable-line no-new
    el: 'body',
    data: {
      targets: undefined,
      currentTarget: undefined
    },
    methods: {
    },
    created: function () {
      chrome.devtools.inspectedWindow.eval(
        "f1targets",
        (f1targets, isException) => {
          if (isException) {
            console.log(isException);
          } else {
            this.targets = _.values(f1targets);
          }
        }
      );
    },
    attached: function () {
    },
    ready: function () {
    },
    components: [inspectElement]
  });


  var port = chrome.runtime.connect({name: "Eval in context"});
  port.onMessage.addListener(function (msg) {
    console.log(msg);
  });
  port.postMessage('asdfasfd');
});

