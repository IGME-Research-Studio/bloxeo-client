const React = require('react');
const IdeaBox = require('./IdeaBox.react');
const Sidebar = require('./Sidebar.react');
const OrganizeBoard = require('./OrganizeBoard.react');
const VotingSection = require('./VotingSection.react');
const StateButton = require('./StateButton.react');
const StormStore = require('../stores/StormStore');
const StormActions = require('../actions/StormActions');

/**
 * Retrieve the current data from the StormStore
 */
function getStormState() {
  return {
    currentState: 'generate',
    roomName: StormStore.getRoomName(),
    ideas: StormStore.getAllIdeas(),
    timerStatus: StormStore.getTimerStatus(),
    time: StormStore.getTime(),
  };
}

const StormApp = React.createClass({
  getInitialState: function() {
    return getStormState();
  },
  componentDidMount: function() {
    StormStore.addChangeListener(this._onChange);
    // start timer countdown
    StormActions.countdown();
  },
  compoentWillUnmount: function() {
    StormStore.removeChangeListener(this._onChange);
  },
  /**
   * Event handler for 'change' events coming from the StormStore
   */
  _onChange: function() {
    this.setState(getStormState());
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
          <Sidebar roomName={this.state.roomName} time={this.state.time} />
          <IdeaBox ideas={this.state.ideas} timerStatus={this.state.timerStatus} />
          <StateButton parentStateChange={this.changeState} nextState='organize' />
        </div>
      );
    case 'organize':
      return (
        <div>
          <OrganizeBoard data={this.state.ideas} />
          <VotingSection />
        </div>
      );
    }
  },

});

module.exports = StormApp;
