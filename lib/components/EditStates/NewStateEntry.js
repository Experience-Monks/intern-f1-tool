var React = require('react');

module.exports = React.createClass( {

  getDefaultProperties: function() {

    return {
      handleChange: function() {}
    };
  },

  render: function() {
    return (
      <div>
        <label>New State</label>
        <input type="text" onKeyUp={this._onKeyUp} ref="newStateName" />
      </div>
    );
  },

  _onKeyUp: function(ev) {

    var newStateName;

    // enter key
    if(String.fromCharCode(ev.which) === '\r') {

      newStateName = React.findDOMNode(this.refs.newStateName);

      this.props.handleChange(newStateName.value.trim());

      newStateName.value = '';
    }
  }
});