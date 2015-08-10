var EventEmitter = require('events').EventEmitter;
var dispatcher = require('../dispatcher');
var model = require('./model');

var targets = model.targets;
var order = [];

var e = new EventEmitter();

dispatcher.register(function(ev) {

  switch(ev.type) {
    case 'targets_set':

      targets[ ev.name ] = ev.target;
      order.push(ev.name);
      
      e.emit('target', {
        name: ev.name,
        target: ev.target,
        targets: targets,
        order: order
      });
    break;
  }
});

e.getOrder = function() {

  return order;
};

e.getTargets = function() {

  return targets;
};


module.exports = e;