const React = require('react');
const Idea = require('./Idea.react');

const IdeaList = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    // get each idea content
    const ideas = this.props.ideas.map(function(idea) {
      return (
        <Idea>{idea.content}</Idea>
      );
    });
    // put all ideas in ideaList
    return (
      <div className="ideaList">
        {ideas}
      </div>
    );
  },
});

module.exports = IdeaList;
