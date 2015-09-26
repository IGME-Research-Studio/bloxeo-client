const React = require('react');

const Idea = React.createClass({
  render: function() {
    return (
      <div className="idea">
        {this.props.children}
      </div>
    );
  },
});

module.exports = Idea;
