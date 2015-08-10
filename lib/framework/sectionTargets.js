var React = require('react');
var EditTargets = require('../components/EditTargets');
var getContainer = require('./getContainer');
var framework = require('./');

module.exports = function() {

  return {
    init: function(req, done) {

      this.container = getContainer(req.route);

      React.render(
        <EditTargets />,
        this.container,
        function() {
          console.log('done', req.route);
          done();
        }
      );

      document.body.onclick = function() {

        if(req.route === '/targets')
          framework.go('/states');
        else
          framework.go('/targets');
      };
    },

    resize: function(w, h) {

      this.container.style.top = '40px';
      this.container.style.width = w + 'px';
      this.container.style.height = h - 40 + 'px';
    },

    animateIn: function(req, done) {
      done();
    },

    animateOut: function(req, done) {
      done();
    },

    destroy: function(req, done) {

      console.log('destroy');

      React.unmountComponentAtNode(this.container);
      this.container.parentNode.removeChild(this.container);
      done();
    }
  }
};