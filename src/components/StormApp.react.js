const React = require('react');
const IdeaBox = require('./IdeaBox.react');
const OrganizeBoard = require('./OrganizeBoard.react');
const VotingSection = require('./VotingSection.react');
const StateButton = require('./StateButton.react');
const StormStore = require('../stores/StormStore');
const MembersList = require('./MembersList.react');

const StormApp = React.createClass({
  getInitialState: function() {
    return {
      currentState: 'generate',
      ideas: StormStore.getAllIdeas(),
      members: StormStore.getAllMembers(),
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
          <MembersList data={this.state.members} />
          <IdeaBox data={this.state.ideas} />
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
    }
  },
});

module.exports = StormApp;
