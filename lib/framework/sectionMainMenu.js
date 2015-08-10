var React = require('react');
var MainMenu = require('../components/MainMenu');
var getContainer = require('./getContainer');
var framework = require('./');

module.exports = {
  init: function(req, done) {

    if(!this.component) {

      this.container = getContainer('menu');

      this.component = React.render(
        <MainMenu framework={framework} />,
        this.container,
        function() {
          console.log('----done menu');
          done();
        }
      );  

      this.component.setState({ route: req.route });
    } else {

      this.component.setState({ route: req.route });

      console.log('-----done menu');
      done();
    }
  },

  animateIn: function(req, done) {
    done();
  },

  animateOut: function(req, done) {
    done();
  },

  resize: function(w, h) {

    this.container.style.width = w + 'px';
    this.container.style.height = '40px';
  },

  destroy: function(req, done) {
    done();
  }
};