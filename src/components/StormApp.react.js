const React           = require('react');
const Sidebar         = require('./Sidebar.react');
const Workspace       = require('./Workspace.react');
const StormStore      = require('../stores/StormStore');
const StormActions    = require('../actions/StormActions');
const dragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend    = require('react-dnd-html5-backend');
const LandingPage     = require('./LandingPage.react');

/**
 * Retrieve the current data from the StormStore
 */
function getStormState() {
  return {
    room: StormStore.getRoomInfo(),
    ideas: StormStore.getAllIdeas(),
    timerStatus: StormStore.getTimerStatus(),
    time: StormStore.getTime(),
    groups: StormStore.getAllGroups(),
    page: 'Landing',
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
  /**
   * @return {object}
   */
  render: function() {
    switch (this.state.page) {
    case 'Landing':
      return (
       <LandingPage />
      );
    case 'Workspace':
      return (
        <div className="appContainer">
          <Sidebar room={this.state.room} time={this.state.time} timerStatus={this.state.timerStatus} ideas={this.state.ideas} />
          <div className="dragContainer">
            <Workspace groups={this.state.groups}/>
          </div>
        </div>
      );
    }
  },

});


module.exports = dragDropContext(HTML5Backend)(StormApp);
