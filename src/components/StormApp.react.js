const React = require('react');

const BoardOptionsStore = require('../stores/BoardOptionsStore');
const CollectionStore   = require('../stores/CollectionStore');
const TimerStore        = require('../stores/TimerStore');
const IdeaStore         = require('../stores/IdeaStore');

const LoadingOverlay  = require('./Loading.react');
const NavBar          = require('./NavBar.react');
const Results         = require('./Results/Results.react');
const Sidebar         = require('./Sidebar/Sidebar.react');
const Workspace       = require('./Workspace/Workspace.react');

const NavBarConstants = require('../constants/NavBarConstants');

const dragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend    = require('react-dnd-html5-backend');

/**
 * Retrieve the current data from the StormStore
 */
function getStormState() {
  return {
    timerStatus: TimerStore.getTimerStatus(),
    groups: CollectionStore.getAllCollections(),
    ideas: IdeaStore.getAllIdeas(),
    room: BoardOptionsStore.getRoomData(),
    tab: BoardOptionsStore.getSelectedTab(),
    time: TimerStore.getTime(),
    timerWidth: TimerStore.getTimerWidth(),
    timerState: TimerStore.getTimerState(),
  };
}

const StormApp = React.createClass({
  getInitialState: function() {
    return getStormState();
  },
  componentDidMount: function() {
    BoardOptionsStore.addNameListener(this._onChange);
    BoardOptionsStore.addTabChangeListener(this._onChange);
    CollectionStore.addChangeListener(this._onChange);
    TimerStore.addChangeListener(this._onChange);
    TimerStore.addStateListener(this._onChange);
    IdeaStore.addChangeListener(this._onChange);

    const ideasElement = document.querySelector('body');
    const hideScroll = 'overflow: hidden';
    ideasElement.setAttribute('style', hideScroll);
  },
  componentWillUnmount: function() {
    BoardOptionsStore.removeNameListener(this._onChange);
    BoardOptionsStore.removeTabChangeListener(this._onChange);
    CollectionStore.removeChangeListener(this._onChange);
    TimerStore.removeChangeListener(this._onChange);
    TimerStore.removeStateListener(this._onChange);
    IdeaStore.removeChangeListener(this._onChange);
  },
  /**
   * Event handler for 'change' events coming from the StormStore
   */
  _onChange: function() {
    if (this.isMounted()) {
      this.setState(getStormState());
    }
  },
  /**
   * Render StormApp component
   * @return {object}
   */
  render: function() {
    return (
      <div className="appContainer">
        <LoadingOverlay disabled={false}/>
        <Sidebar room={this.state.room} time={this.state.time} timerStatus={this.state.timerStatus} ideas={this.state.ideas} timerWidth={this.state.timerWidth}/>
        <div className="dragContainer">
          <NavBar selectedTab={this.state.tab} />
          {(() => {
            switch (this.state.tab) {
            case NavBarConstants.WORKSPACE_TAB:
              return <Workspace />;
            case NavBarConstants.RESULTS_TAB:
              return <Results />;
            default:
              break;
            }
          })()}
        </div>
      </div>
    );
  },
});

module.exports = dragDropContext(HTML5Backend)(StormApp);
