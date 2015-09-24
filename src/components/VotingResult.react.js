const React = require('react');
const VoteElement = require('../components/VoteElement.react');

// page to display voting results
const VotingResult = React.createClass({
  render: function() {
    // array for ideas that were voted no
    const droppedIdeas = [];
    // map the updated idea array
    const keepIdeas = this.props.data.map(function(keepIdea) {
      // if keep is true, return idea to keepIdeas
      if (!keepIdea.keep) {
        // if the idea is false, push it to the droppedIdeas array
        const dropIdea = <VoteElement idea={keepIdea.idea} />;
        droppedIdeas.push(dropIdea);
      } else {
        return (
          <VoteElement idea={keepIdea.idea} />
        );
      }
    });
    return (
      <div>
        <h1> Ideas to keep </h1>
          {keepIdeas}
        <h1> Ideas to forget </h1>
          {droppedIdeas}
        <a className="voteButton">Back to Main Screen</a>
      </div>
    );
  },
});

module.exports = VotingResult;
