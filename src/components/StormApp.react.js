const React = require('react');
const StormStore = require('../stores/StormStore');
const Workspace = require('../components/Workspace.react');
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
      <div className="appContainer">
        <Sidebar roomName={this.state.roomName} />
        <div className="dragContainer">
          <Workspace groups={this.state.groups}/>
        </div>
      </div>
    );
  },

});

module.exports = StormApp;
