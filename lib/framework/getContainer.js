module.exports = function(route) {
  var container = document.createElement('div');

  container.style.position = 'absolute';
  container.style.left = container.style.top = '0px';
  container.id = route;

  document.body.appendChild(container);

  return container;
};