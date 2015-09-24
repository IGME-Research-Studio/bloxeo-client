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
        votesCast: 0
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
      const body = document.querySelector('body');
      React.render(<VotingResult data={this.props.data} />, body);
    } else {
      this.setState({currentIdea: this.props.data[this.state.votesCast].content});
    }
  },
  render: function() {
    return (
      <div>
        <VoteElement idea={this.state.currentIdea} />
        <VoteButton data="true" changeState={this.handleStateChange} />
        <VoteButton data="false" changeState={this.handleStateChange} />
      </div>
    );
  },
});

module.exports = VotingSection;
