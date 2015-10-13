const React = require('react');
const IdeaBox = require('./IdeaBox.react');
const VotingSection = require('./VotingSection.react');
const StateButton = require('./StateButton.react');
const StormStore = require('../stores/StormStore');
const Wordbank = require('../components/Wordbank.react');
const Workspace = require('../components/Workspace.react');
const TimerElement = require('../components/TimerElement.react');
const Sidebar = require('./Sidebar.react');

const StormApp = React.createClass({
  getInitialState: function() {
    return {
      currentState: 'generate',
      roomName: StormStore.getRoomName(),
      ideas: StormStore.getAllIdeas(),
      groups: StormStore.getAllGroups(),
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
    return (
      <div>
        <TimerElement />
        <Sidebar roomName={this.state.roomName} />
        <IdeaBox data={this.state.ideas} />
        <div><Wordbank data={this.state.ideas}/></div>
        <div className="dragContainer"><Workspace groups={this.state.groups}/></div>
        <VotingSection />
      </div>
    );
  },

});

module.exports = StormApp;
