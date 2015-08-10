var React = require('react');

module.exports = React.createClass( {

  render: function() {

    var style = {
      maxWidth: this.props.width + 'px'
    };

    return (
      <img src={this.props.src} style={style} />
    );
  }
});