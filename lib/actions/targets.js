var dispatcher = require('../dispatcher');

module.exports = {
  addTarget: function(target) {

    var name = 'image' + Date.now();

    this.setTarget(name, target);

    return name;
  },

  setTarget: function(name, target) {

    dispatcher.dispatch({
      type: 'targets_set',
      name: name,
      target: target
    });
  }
};