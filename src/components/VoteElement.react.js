const React = require('react');

const VoteElement = React.createClass({
  render: function() {
    return (
<<<<<<< HEAD
      <div>
=======
      <div className="idea">
>>>>>>> upstream/master
        {this.props.idea.toString()}
      </div>
    );
  },
});

module.exports = VoteElement;
