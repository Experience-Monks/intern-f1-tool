var React = require('react');
var DragDrop = require('./DragDrop');
var Layers = require('./Layers');


module.exports = React.createClass( {

  render: function() {

    var style = {
      width: '100%',
      height: '100%'
    };

    var styleDragDrop = {
      position: 'absolute',
      zIndex: 1,
      background: '#FEE',
      width: '100%',
      height: '100%'
    };

    var styleLayers = {
      position: 'absolute',
      zIndex: 2,
      right: 0,
      border: 'solid 1px #000'
    };

    return (
      <div id="container" style={style}>
        <DragDrop style={styleDragDrop} />
        <Layers style={styleLayers} width="200" height="400" />
      </div>
    );
  },

  componentDidMount: function() {

    
  },

  componentWillUnmount: function() {

    
  }
});