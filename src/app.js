const React = require('react');

const HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  },
});

const body = document.querySelector('body');

React.render(<HelloMessage name="Peter" />, body);
