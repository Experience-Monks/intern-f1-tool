var React = require('react');
var targets = require('../../store/targets');
var merge = require('object-assign');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      hasTargets: targets.getOrder().length > 0
    };
  },

  componentWillMount: function() {
    targets.on('target', function() {
      this.setState({ hasTargets: true });
    }.bind(this));
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
        <li style={styleLI} onClick={this._onMenuPress.bind(this, '/targets')}>
          <a style={styleEnabled}>Targets</a>
        </li>
        <li style={styleLI} onClick={this._onMenuPress.bind(this, '/states')}>
          <a style={this.state.hasTargets ? styleEnabled : styleDisabled}>States</a>
        </li>
        <li style={styleLI}  onClick={this._onMenuPress.bind(this, '/transitions')}>
          <a style={this.state.hasStates ? styleEnabled : styleDisabled}>Transitions</a>
        </li>
      </ul>
    );
  },

  _onMenuPress: function(route) {

    console.log(route);

    switch(route) {

      case '/transitions':
        if(!this.state.hasStates) {
          break;
        }

      case '/states':
        if(!this.state.hasTargets) {
          break;
        }

      default:
        console.log('go', route);
        this.props.framework.go(route);
      break;
    }
    
  }
});