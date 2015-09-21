const React = require('react');
const VotingResult = require('../components/VotingResult.react');
const VoteButton = require('../components/VoteButton.react');
const VoteElement = require('../components/VoteElement.react');

// page for displaying ideas and voting on them
const VotingSection = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        currentIdea: this.props.data[0].content,
        votesCast: 0,
        state: 'vote',
      }
    );
  },
  // changes state on button click
  handleStateChange: function(keep) {
    if (!keep) {
      this.props.data[this.state.votesCast].keep = false;
    }

    this.state.votesCast++;
    if (this.state.votesCast === this.props.data.length) {
      this.setState({
        state: 'results',
      });
      this.forceUpdate();
    } else {
      this.setState({currentIdea: this.props.data[this.state.votesCast].content});
    }
  },
  render: function() {
    switch (this.state.state) {
    case 'vote':
      return (
        <div className="votingSection">
          <VoteElement idea={this.state.currentIdea} />
          <VoteButton data='true' changeState={this.handleStateChange} />
          <VoteButton data='false' changeState={this.handleStateChange} />
        </div>
      );
    case 'results':
      return (
        <div>
          <VotingResult data={this.props.data} />
        </div>
      );
    }
  },
});

module.exports = VotingSection;
