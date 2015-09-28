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
        const dropIdea = <VoteElement idea={keepIdea.content} />;
        droppedIdeas.push(dropIdea);
      } else {
        return (
          <VoteElement idea={keepIdea.content} />
        );
      }
    });
    return (
<<<<<<< HEAD
      <div>
        <h1> Ideas to keep </h1>
          {keepIdeas}
        <h1> Ideas to forget </h1>
          {droppedIdeas}
        <a className="voteButton">Back to Main Screen</a>
=======
      <div className="votingResults">
        <h1> Ideas to Keep </h1>
        <div className="votingResults-ideas">
          {keepIdeas}
        </div>
        <h1> Ideas to Forget </h1>
        <div className="votingResults-ideas">
          {droppedIdeas}
        </div>
>>>>>>> upstream/master
      </div>
    );
  },
});

module.exports = VotingResult;
