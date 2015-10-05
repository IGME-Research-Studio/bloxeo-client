const React = require('react');
const Wordbank = require('../components/Wordbank.react');
const Workspace = require('../components/Workspace.react');
const VotingSection = require('../components/VotingSection.react');
const IdeaBox = require('../components/IdeaBox.react');
const StateButton = require('../components/StateButton.react');

const StormApp = React.createClass({
  getInitialState: function() {
    const ideaData = [];

    return {
      currentState: 'generate',
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
          <div><Wordbank data={this.state.ideas}/></div>
          <div className="dragContainer"><Workspace data={this.state.ideas}/></div>
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
