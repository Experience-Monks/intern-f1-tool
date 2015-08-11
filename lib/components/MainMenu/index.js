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
      opacity: 0.5,
      cursor: 'default'
    };

    var styleEnabled = {
      opacity: 1,
      cursor: 'pointer'
    };

    var {currentView} = this.props;

    return (
      <ul style={style}> 
        <li style={styleLI}>
          <Link to="targets">
            <a style={['/', '/targets'].indexOf(currentView) !== -1 ? styleEnabled : styleDisabled}>Targets</a>
          </Link>
        </li>
        <li style={styleLI}>
          <Link to="states">
            <a style={currentView === '/states' ? styleEnabled : styleDisabled}>States</a>
          </Link>
        </li>
        <li style={styleLI}>
          <Link to="transitions">
            <a style={currentView === '/transitions' ? styleEnabled : styleDisabled}>Transitions</a>
          </Link>
        </li>
      </ul>
    );
  }
});