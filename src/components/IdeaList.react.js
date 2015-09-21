const React = require('react');
const Idea = require('./Idea.react');

const IdeaList = React.createClass({
  render: function() {
    const ideas = this.props.data.map( function(idea) {
      return (
        <Idea>{idea.content}</Idea>
      );
    });
    return (
      <div className="ideaList">
        {ideas}
      </div>
    );
  },
});

module.exports = IdeaList;
