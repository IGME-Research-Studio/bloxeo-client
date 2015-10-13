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
    switch (this.state.currentState) {
    case 'timer':
      return (
         <TimerElement />
      );
    case 'generate':
      return (
        <div>
          <Sidebar />
          <IdeaBox data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='organize'/>
        </div>
      );
    case 'organize':
      return (
        <div>
          <div><Wordbank data={this.state.ideas}/></div>
          <div className="dragContainer"><Workspace groups={this.state.groups}/></div>
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
    }
  },

});

module.exports = StormApp;
