import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import colorTheme from '../colorTheme';
import { find, propEq, pipe } from 'ramda';

import BoardOptionsStore from '../stores/BoardOptionsStore';
import CollectionStore from '../stores/CollectionStore';
import IdeaStore from '../stores/IdeaStore';
import LoadingStore from '../stores/LoadingStore';

import LoadingOverlay from '../components/LoadingOverlay.react';
import NavBar from '../components/NavBar.react';
import Results from '../components/Results/Results.react';
import Sidebar from '../components/Sidebar/Sidebar.react';
import Workspace from '../components/Workspace/Workspace.react';

import { joinBoard, leaveBoard } from '../actions/StormActions';

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
    this.state = getRoomState({loading: true});

    this._onChange = () => this.setState(getRoomState(this.state));
    this._onLoad = () => this.setState({loading: false});
    this._joinBoard = (boardId) => joinBoard(boardId);
    this._switchTab = (isOnWorkspace) => (
      isOnWorkspace ?
        <Workspace boardId={this.props.params.boardId} /> :
        <Results />
    );

    this._isAdmin = () => (
      pipe(
        find(propEq('userId', getUserId())),
        propEq('isAdmin', true)
      )(this.state.room.users)
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

    leaveBoard(this.props.params.boardId);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>
        <div className="appContainer">

          <LoadingOverlay enabled={this.state.loading}/>

          <Sidebar
            room={this.state.room}
            ideas={this.state.ideas}
            time={this.state.time}
            timerStatus={this.state.timerStatus}
            timerWidth={this.state.timerWidth}
          />

          <div className="dragContainer">
            <NavBar
              isOnWorkspace={this.state.onWorkspace}
              isAdmin={this._isAdmin()}
            />
            {( this._switchTab(this.state.onWorkspace) )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = dragDropContext(HTML5Backend)(RoomContainer);
