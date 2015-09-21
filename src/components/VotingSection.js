const React = require('react');
const body = document.querySelector('body');

const IdeaContainer = React.createClass({
  render: function() {
    return (
      <div>
        <Idea />
        <VoteButton data="true" />
        <VoteButton data="false" />
      </div>
    );
  },
});

const Idea = React.createClass({
  render: function() {
    return <div>Purple Dinosaur</div>;
  }
});

const VoteButton = React.createClass({
  handleButtonClick: function() {
    console.log('button clicked');
  },
  render: function() {
    console.log(this.props.data);
    if (this.props.data === 'true') {
      return <button class="yesButton" onClick={this.handleButtonClick}>Yes</button>;
    } else {
      return <button class="noButton">No</button>;
    }
  }
});

React.render(<IdeaContainer />, body);