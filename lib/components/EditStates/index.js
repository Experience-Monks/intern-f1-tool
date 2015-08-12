var React = require('react');
var targets = require('../../store/model.js').targets;

var NewStateEntry = require('./NewStateEntry');

module.exports = React.createClass( {

  render: function() {
    return (
      <div> 
        <NewStateEntry handleChange={this._onNewEntry} />
      </div>
    );
  },

  statics: {
    willTransitionTo: function (transition) {
      var hasTargets = Object.keys(targets).length;
      if (!hasTargets) {
        transition.abort();
      }
    },
  },

  _onNewEntry: function(ev) {
    console.log(ev);
  }
});