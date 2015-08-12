var React = require('react');
var states = require('../../store/model.js').states;

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Transitions</h2>
      </div>
    );
  },

  statics: {
    willTransitionTo: function (transition) {
      var hasStates = Object.keys(states).length > 2;
      if (!hasStates) {
        console.warn('At least 2 states are required to apply transitions');
        transition.abort();
      }
    },
  }
});