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

import { joinBoard } from '../actions/StormActions';

/**
 * Set the initial state of the app before any data is received
 */
function getInitialState() {
  return {
    loading: true,
    groups: CollectionStore.getAllCollections(),
    ideas: IdeaStore.getAllIdeas(),
    room: BoardOptionsStore.getBoardOptions(),
    onWorkspace: BoardOptionsStore.getIsOnWorkspace(),
  };
}

/**
 * Retrieve the current data from the StormStore
 * @param {Object} prevState
 * @returns {Object} new state object
 */
function getRoomState(prevState) {
  return {
    ...prevState,
    groups: CollectionStore.getAllCollections(),
    ideas: IdeaStore.getAllIdeas(),
    room: BoardOptionsStore.getBoardOptions(),
    onWorkspace: BoardOptionsStore.getIsOnWorkspace(),
  };
}

class RoomContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();

    this._onChange = () => this.setState(getRoomState(this.state));
    this._onLoad = () => this.setState({loading: false});
    this._joinBoard = (boardId) => joinBoard(boardId);
    this._switchTab = (isOnWorkspace) => (
      isOnWorkspace ?
        <Workspace boardId={this.props.params.boardId} /> :
        <Results />
    );
  }

  componentDidMount() {
    BoardOptionsStore.addUpdateListener(this._onChange);
    CollectionStore.addChangeListener(this._onChange);
    IdeaStore.addChangeListener(this._onChange);

    LoadingStore.addLoadingListener(this._onLoad);
    // start timer countdown
    // countdown();

    const ideasElement = document.querySelector('body');
    const hideScroll = 'overflow: hidden';
    ideasElement.setAttribute('style', hideScroll);
  }

  componentWillUnmount() {
    BoardOptionsStore.removeUpdateListener(this._onChange);
    CollectionStore.removeChangeListener(this._onChange);
    IdeaStore.removeChangeListener(this._onChange);

    LoadingStore.removeLoadingListener(this._onLoad);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>
        <div className="appContainer">

          <LoadingOverlay enabled={this.state.loading}/>

          <Sidebar room={this.state.room}
            time={this.state.time}
            timerStatus={this.state.timerStatus}
            ideas={this.state.ideas}
            timerWidth={this.state.timerWidth}
          />

          <div className="dragContainer">
            <NavBar isOnWorkspace={this.state.onWorkspace} />
            {( this._switchTab(this.state.onWorkspace) )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = dragDropContext(HTML5Backend)(RoomContainer);
