var React = require('react');

module.exports = React.createClass({
  render: function() {

    var style = {
      listStyleType: 'none',
      margin: 0,
      padding: 0
    };

    var liStyle = {
      display: 'inline-block',
      width: '200px'
    };

    return (
      <ul style={style}> 
        <li style={liStyle} onClick={this._onMenuPress.bind(this, '/targets')}>Targets</li>
        <li style={liStyle} onClick={this._onMenuPress.bind(this, '/states')}>States</li>
        <li style={liStyle}  onClick={this._onMenuPress.bind(this, '/transitions')}>Transitions</li>
      </ul>
    );
  },

  _onMenuPress: function(route) {
    this.props.framework.go(route);
  }
});