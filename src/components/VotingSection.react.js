const React = require('react');

let i = 0;
// page for displaying ideas and voting on them
const VotingSection = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {currentIdea: this.props.data[i].idea}
    );
  },
  // changes state on button click
  handleStateChange: function(keep) {
    if (!keep) {
      this.props.data[i].keep = false;
    }

    i++;
    
    if (i === this.props.data.length) {
      const body = document.querySelector('body');
      React.render(<VotingResult data={this.props.data} />, body);
    } else {
      this.setState({currentIdea: this.props.data[i].idea});
    }
  },
  render: function() {
    return (
      <div>
        <Idea idea={this.state.currentIdea} />
        <VoteButton data="true" changeState={this.handleStateChange} />
        <VoteButton data="false" changeState={this.handleStateChange} />
      </div>
    );
  },
});

// page to display voting results
const VotingResult = React.createClass({
  render: function() {
    // map the updated idea array
    const ideaNode = this.props.data.map(function(idea) {
      // only return if keep is true
      if (idea.keep) {
        return (
          <Idea idea={idea.idea} />
        );
      }
    });
    return (
      <div>
        {ideaNode}
        <a className="voteButton">Back to Main Screen</a>
      </div>
    );
  },
});

const Idea = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.idea}
      </div>
    );
  },
});

const VoteButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeState(this.props.data === 'true');
  },
  render: function() {
    if (this.props.data === 'true') {
      return <button className="yesButton" onClick={this.handleClick}>Yes</button>;
    }
    return <button className="noButton" onClick={this.handleClick}>No</button>;
  },
});

module.exports = VotingSection;
