const React = require('react');
const OrganizeBoard = require('../components/OrganizeBoard.react');
const VotingSection = require('../components/VotingSection.react');
const IdeaBox = require('../components/IdeaBox.react');
const StateButton = require('../components/StateButton.react');
const TimerElement = require('../components/TimerElement.react');

const StormApp = React.createClass({
  getInitialState: function() {
    const ideaData = [];

    return {
      currentState: 'timer',
      ideas: ideaData,
    };
  },
  addIdeaData: function(idea) {
    const ideas = this.state.ideas;
    ideas.push(idea);
    this.setState({
      ideas: ideas,
    });
  },
  changeState: function(nextState) {
    this.setState({
      currentState: nextState,
    });
    const isKeep = function(idea) {
      return idea.keep;
    };

    let tempArr = this.state.ideas;
    tempArr = tempArr.filter(isKeep);
    this.setState({
      ideas: tempArr,
    });
    this.forceUpdate();

  },
  /**
   * @return {object}
   */
  render: function() {
    switch (this.state.currentState) {
    case 'timer':
      return (
         <TimerElement />
      );
    case 'generate':
      return (
        <div>
          <IdeaBox data={this.state.ideas} sendParentData={this.addIdeaData}/>
          <StateButton parentStateChange={this.changeState} nextState='organize'/>
        </div>
      );
    case 'organize':
      return (
        <div>
          <OrganizeBoard data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='vote'/>
        </div>
      );
    case 'vote':
      return (
        <div>
          <VotingSection data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='generate'/>
        </div>
      );
    default:
      return (
        <div> Blahhhh </div>
      );
    }
  },

});

module.exports = StormApp;
