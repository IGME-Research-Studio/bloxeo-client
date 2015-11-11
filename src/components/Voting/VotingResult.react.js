const React = require('react');
const VoteElement = require('./VoteElement.react');

/**
 * Component for displaying voting results
 */
const VotingResult = React.createClass({
  /**
   * Render VotingResult component
   * @return {object}
   */
  render: function() {
    // array for ideas that were voted no
    const droppedIdeas = [];
    // map the updated idea array
    const keepIdeas = this.props.data.map(function(idea) {
      // if keep is true, return idea to keepIdeas
      if (!idea.keep) {
        // if keep is false, push it to the droppedIdeas array
        const dropIdea = <VoteElement idea={idea} />;
        droppedIdeas.push(dropIdea);
      } else {
        return (
          <VoteElement idea={idea} />
        );
      }
    });

    return (
      <div>
        <h1>Ideas to Keep</h1>
        <div className="votingResults-ideas">
          {keepIdeas}
        </div>
        <h1>Ideas to Forget</h1>
        <div className="votingResults-ideas">
          {droppedIdeas}
        </div>
      </div>
    );
  },
});

module.exports = VotingResult;
