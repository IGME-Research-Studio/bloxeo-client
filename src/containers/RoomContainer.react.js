import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import colorTheme from '../colorTheme';

import BoardOptionsStore from '../stores/BoardOptionsStore';
import CollectionStore from '../stores/CollectionStore';
import IdeaStore from '../stores/IdeaStore';
import LoadingStore from '../stores/LoadingStore';

import LoadingOverlay from '../components/LoadingOverlay.react';
import NavBar from '../components/NavBar.react';
import Results from '../components/Results/Results.react';
import Sidebar from '../components/Sidebar/Sidebar.react';
import Workspace from '../components/Workspace/Workspace.react';

import StormActions    from '../actions/StormActions';
import NavBarConstants from '../constants/NavBarConstants';

/**
 * Retrieve the current data from the StormStore
 */
function getStormState() {
  return {
    groups: CollectionStore.getAllCollections(),
    ideas: IdeaStore.getAllIdeas(),
    room: BoardOptionsStore.getRoomData(),
    tab: BoardOptionsStore.getSelectedTab(),
  };
}

class RoomContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStormState();
  }

  componentDidMount() {
    BoardOptionsStore.addNameListener(this._onChange);
    BoardOptionsStore.addTabChangeListener(this._onChange);
    CollectionStore.addChangeListener(this._onChange);
    IdeaStore.addChangeListener(this._onChange);
    // start timer countdown
    StormActions.countdown();

    const ideasElement = document.querySelector('body');
    const hideScroll = 'overflow: hidden';
    ideasElement.setAttribute('style', hideScroll);
  }

  componentWillUnmount() {
    BoardOptionsStore.removeNameListener(this._onChange);
    BoardOptionsStore.removeTabChangeListener(this._onChange);
    CollectionStore.removeChangeListener(this._onChange);
    IdeaStore.removeChangeListener(this._onChange);
  }

  /**
   * Event handler for 'change' events coming from the StormStore
   */
  _onChange = () => {
    this.setState(getStormState());
  }

  _switchTab = () => {
    if (this.state.tab === NavBarConstants.WORKSPACE_TAB) {
      return <Workspace />;
    }
    else {
      return <Results />;
    }
  }

  /**
   * @return {object}
   */
  render() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>
        <div className="appContainer">

          <LoadingOverlay disabled={false}/>

          <Sidebar room={this.state.room}
            time={this.state.time}
            timerStatus={this.state.timerStatus}
            ideas={this.state.ideas}
            timerWidth={this.state.timerWidth}
          />

          <div className="dragContainer">
            <NavBar selectedTab={this.state.tab} />
            {(this._switchTab())}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = dragDropContext(HTML5Backend)(RoomContainer);
