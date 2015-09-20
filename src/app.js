const React = require('react');

const HelloMessage = React.createClass({
  render: () => {
    return <div>Hello {this.props.name}</div>;
  },
});

React.render(<HelloMessage name="John" />, mountNode);
