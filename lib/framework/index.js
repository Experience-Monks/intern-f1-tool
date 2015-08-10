var bigwheel = require('bigwheel');

module.exports = bigwheel( function() {

  return {

    routes: {
      '/': '/targets',
      '/targets': [require('./sectionMainMenu'), require('./sectionTargets')],
      '/states': [require('./sectionMainMenu'), require('./sectionStates')]
    }
  };
});