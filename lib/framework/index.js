var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, DefaultRoute, Link } = Router;

var MainMenu = require('../components/MainMenu');
var Targets = require('../components/EditTargets/index.js');
var States = require('../components/EditStates/index.js');
var Transitions = require('../components/EditTransitions/index.js');

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      <div classNameame="App">
        <MainMenu/>
        <section className="main">
          <RouteHandler/>
        </section>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Targets}/>
    <Route name="states" handler={States}/>
    <Route name="targets" handler={Targets}/>
    <Route name="transitions" handler={Transitions}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});