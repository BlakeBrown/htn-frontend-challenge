var React = require('react');
var HelloWorldComponent = require('./HelloWorldComponent.js');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>Hack the North Frontend Challenge</h1>
        </header>
        <section>
          <HelloWorldComponent />
        </section>
      </div>
    );
  }
});
