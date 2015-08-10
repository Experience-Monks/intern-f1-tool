var React = require('react');
var Layer = require('./Layer');
var storeTargets = require('../../store/targets');
var assign = require('object-assign');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      order: storeTargets.getOrder(),
      targets: storeTargets.getTargets()
    };
  },

  render: function() {

    var layers = [];

    var style = assign(this.props.style, {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      overflow: 'scroll'
    });

    this.state.order.forEach(function(i) {
      layers.push(<Layer key={i} src={this.state.targets[ i ]} width={this.props.width} />);
    }.bind(this));

    return (
      <div {...this.props} className="layers" style={style}>
        {layers}
      </div>   
    );
  },

  componentDidMount: function() {

    storeTargets.on('target', this._onNewTarget);
  },

  componentDidUnmount: function() {

    storeTargets.removeListener('target', this._onNewTarget);
  },

  _onNewTarget: function(ev) {

    this.setState({ order: ev.order, targets: ev.targets });
  }
});