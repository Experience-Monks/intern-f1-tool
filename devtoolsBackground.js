/* eslint max-depth:[1, 5] */
/* global $0, chrome */

function getPanelContents () {
  var getElementProps = function (f1, id) {
    return {
      states: _.pluck(f1.defStates, id),
      transitions: _.pluck(f1.defTransitions, id)
    };
  };
  if ($0) {
    var el = $0;
    var f1handle = el.__f1__;
    // if selected element doesn't have an f1 f1handle, crawl up the tree to find the closes element that does
    while ((!f1handle) && el.parentNode) {
      el = el.parentNode;
      f1handle = el.__f1__;
    }
    if (!f1handle) {
      return {};
    } else {
      // window.$f1 = f1handle;
      var state = {};
      for (var key in f1handle) { // eslint-disable-line guard-for-in
        if (key.charAt(0) === '$') { continue; }
        state[key] = f1handle[key];
      }
      return state;
    }
  } else {
    return {};
  }
}

var panels = chrome && chrome.devtools && chrome.devtools.panels;
var expression = "(" + getPanelContents.toString() + ")()";
panels.elements.createSidebarPane(
  'F1 Properties',
  function (sidebar) {
    panels.elements.onSelectionChanged.addListener(function () {
      sidebar.setExpression(expression);
    });

    var f1Panel = panels.create(
      "F1",
      null,
      "panel/app.html"
    );
  }
);