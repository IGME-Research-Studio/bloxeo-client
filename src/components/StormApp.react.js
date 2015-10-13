const React = require('react');
const IdeaBox = require('./IdeaBox.react');
const TimerElement = require('../components/TimerElement.react');
const OrganizeBoard = require('./OrganizeBoard.react');
const VotingSection = require('./VotingSection.react');
const StateButton = require('./StateButton.react');
const StormStore = require('../stores/StormStore');
const Sidebar = require('./Sidebar.react');

const StormApp = React.createClass({
  getInitialState: function() {
    return {
      currentState: 'generate',
      roomName: StormStore.getRoomName(),
      ideas: StormStore.getAllIdeas(),
    };
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
          <Sidebar roomName={this.state.roomName} />
          <IdeaBox data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='organize' />
        </div>
      );
    case 'organize':
      return (
        <div>
          <OrganizeBoard data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='vote' />
        </div>
      );
    case 'vote':
      return (
        <div>
          <VotingSection data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='generate' />
        </div>
      );
    }
  },

});

module.exports = StormApp;
