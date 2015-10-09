const React = require('react');
const IdeaBox = require('./IdeaBox.react');
const OrganizeBoard = require('./OrganizeBoard.react');
const VotingSection = require('./VotingSection.react');
const StateButton = require('./StateButton.react');
const StormStore = require('../stores/StormStore');
const Wordbank = require('../components/Wordbank.react');
const Workspace = require('../components/Workspace.react');

const StormApp = React.createClass({
  getInitialState: function() {
    const ideaData = [];
    const ideaGroups = [];
    return {
      currentState: 'generate',
      ideas: StormStore.getAllIdeas(),
      groups: ideaGroups
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
    case 'generate':
      return (
        <div>
          <IdeaBox data={this.state.ideas} />
          <StateButton parentStateChange={this.changeState} nextState='organize'/>
        </div>
      );
    case 'organize':
      return (
        <div>
          <div><Wordbank data={this.state.ideas}/></div>
          <div className="dragContainer"><Workspace data={this.state.ideas} groups={this.state.groups}/></div>
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
