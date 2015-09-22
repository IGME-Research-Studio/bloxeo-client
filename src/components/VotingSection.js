const React = require('react');
const body = document.querySelector('body');

let ideaData = [
	{ idea: 'purple dinosaur', keep: true },
	{ idea: 'massive kitten', keep: true },
	{ idea: 'eye tatoos', keep: true },
];

let i = 0;

const IdeaContainer = React.createClass({
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
    this.setState({currentIdea: this.props.data[i].idea});
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

React.render(<IdeaContainer data={ideaData} />, body);
