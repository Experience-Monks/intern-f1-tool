var React = require('react');
var targets = require('../../store/targets');
var merge = require('object-assign');
var {Link} = require('react-router');

module.exports = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
  },

  componentWillUnmount: function() {

  },

  render: function() {

    var style = {
      listStyleType: 'none',
      margin: 0,
      padding: 0
    };

    var styleLI = {
      display: 'inline-block',
      width: '200px'
    };

    var styleDisabled = {
      opacity: 0.1,
      cursor: 'default'
    };

    var styleEnabled = {
      opacity: 1,
      cursor: 'pointer'
    };

    return (
      <ul style={style}> 
        <li style={styleLI}>
          <Link to="targets">
            <a style={styleEnabled}>Targets</a>
          </Link>
        </li>
        <li style={styleLI}>
          <Link to="states">
            <a style={this.state.hasTargets ? styleEnabled : styleDisabled}>States</a>
          </Link>
        </li>
        <li style={styleLI}>
          <Link to="transitions">
            <a style={this.state.hasStates ? styleEnabled : styleDisabled}>Transitions</a>
          </Link>
        </li>
      </ul>
    );
  }
});