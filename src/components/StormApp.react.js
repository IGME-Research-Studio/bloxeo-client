const React = require('react');
const OrganizeBoard = require('../components/OrganizeBoard.react');
const VotingSection = require('../components/VotingSection.react');
<<<<<<< HEAD

const StormApp = React.createClass({
  getInitialState: function () {
    const ideaData = [
      { content: ['purple'], keep: true },
      { content: ['massive'], keep: true },
      { content: ['eye'], keep: true },
      { content: ['guava'], keep: true},
      { content: ['dinosaur'], keep: true },
      { content: ['kitten'], keep: true },
      { content: ['tattoos'], keep: true },
      { content: ['cake'], keep: true}
    ];
    return {
      ideas: ideaData
    };
=======
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
>>>>>>> upstream/master
  },
  /**
   * @return {object}
   */
<<<<<<< HEAD
  render: function () {
    return (
      <div>
        <VotingSection data={this.state.ideas} />
      </div>
    );
  }
=======
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
>>>>>>> upstream/master
});

module.exports = StormApp;
