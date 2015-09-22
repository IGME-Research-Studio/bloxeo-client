const React = require('react');
const body = document.querySelector('body');

let ideaData = [
	{ idea: 'purple dinosaur', keep: true },
	{ idea: 'massive kitten', keep: true },
	{ idea: 'eye tatoos', keep: true },
];

let i = 0;

const IdeaContainer = React.createClass({
  render: function() {
    return (
      <div>
        <Idea ideas={this.props.data} />
      </div>
    );
  },
});

const Idea = React.createClass({
	//set state to the first element of the array
	getInitialState: function(){
		return(
			{currentIdea: this.props.ideas[i].idea}
		);	
	},
	//on click increment the array to next element and update the state
	handleStateChange: function(){
		i++;
		this.setState({currentIdea: this.props.ideas[i].idea});
	},
  render: function() {
    return(
			<div>
				{this.state.currentIdea}
				<VoteButton data="true" changeState={this.handleStateChange} idea={this.props.ideas[i]} />
      	<VoteButton data="false" changeState={this.handleStateChange} />
			</div>
		);
  },
});

const VoteButton = React.createClass({
  handleButtonClick: function() {	
    console.log(this.props.idea.keep);
  },
  render: function() {
    if (this.props.data === 'true') {
      return <button className="yesButton" onClick={this.props.changeState}>Yes</button>;
    } else {
      return <button className="noButton" onClick={this.props.changeState}>No</button>;
    }
  },
});

React.render(<IdeaContainer data={ideaData} />, body);