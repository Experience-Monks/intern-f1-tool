var React = require('react');

var NewStateEntry = require('./NewStateEntry');

module.exports = React.createClass( {

  render: function() {
    return (
      <div> 
        <NewStateEntry handleChange={this._onNewEntry} />
      </div>
    );
  },

  _onNewEntry: function(ev) {
    console.log(ev);
  }
});