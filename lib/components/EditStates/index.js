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
        console.warn('There are no targets to set states for. Please drag an image into the app to add as a target.');
        transition.abort();
      }
    },
  },

  _onNewEntry: function(ev) {
    console.log(ev);
  }
});