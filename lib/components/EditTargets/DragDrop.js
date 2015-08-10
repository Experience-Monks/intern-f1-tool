var React = require('react');
var dragDrop = require('drag-drop');
var targets = require('../../actions/targets');

console.log('in dd');

module.exports = React.createClass( {

  render: function() {

    return (
      <div {...this.props}></div>
    );
  },

  componentDidMount: function() {
    var el = this.getDOMNode();

    dragDrop(el, this._onDragDrop);
  },

  _onDragDrop: function(files) {
    
    files.forEach( function(file) {

      if(isImage(file)) {

        targets.addTarget(file.path);
      }
    });
  }
});

function isImage(file) {

  return file.type.indexOf('image') !== -1;
}