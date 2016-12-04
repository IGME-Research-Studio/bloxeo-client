import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import colorTheme from '../colorTheme';
import { find, propEq, pipe, ifElse, F, isNil } from 'ramda';

import BoardOptionsStore from '../stores/BoardOptionsStore';
import CollectionStore from '../stores/CollectionStore';
import ErrorStore from '../stores/ErrorStore';
import IdeaStore from '../stores/IdeaStore';
import LoadingStore from '../stores/LoadingStore';
import UserStore from '../stores/UserStore';

import ErrorSnackbar from '../components/ErrorSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar/Sidebar';

import { joinBoard, leaveBoard } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';

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
    user: UserStore.getUserData(),
  };
}

class RoomContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = getRoomState({loading: true, error: '', errorOpen: false });

    this._isAdmin = () => (
      pipe(
        find(propEq('userId', UserStore.getUserId())),
        ifElse(
          isNil, F,
          propEq('isAdmin', true))
      )(this.state.room.users)
    );
  }

  componentDidMount() {
    BoardOptionsStore.addUpdateListener(this._onChange);
    CollectionStore.addChangeListener(this._onChange);
    ErrorStore.addErrorListener(this._onError);
    IdeaStore.addChangeListener(this._onChange);

    LoadingStore.addLoadingListener(this._onLoad);

    const ideasElement = document.querySelector('body');
    const hideScroll = 'overflow: hidden';
    ideasElement.setAttribute('style', hideScroll);

    d.dispatch(joinBoard({
      boardId: this.props.params.boardId,
      userToken: this.state.user.userToken }));
  }

  componentWillUnmount() {
    BoardOptionsStore.removeUpdateListener(this._onChange);
    CollectionStore.removeChangeListener(this._onChange);
    ErrorStore.removeErrorListener(this._onError);
    IdeaStore.removeChangeListener(this._onChange);
    LoadingStore.removeLoadingListener(this._onLoad);

    d.dispatch(leaveBoard({ boardId: this.props.params.boardId }));
  }

  _closeErrorSnackbar = () => {
    this.setState({errorOpen: false});
  }

  _onChange = () => {
    this.setState(getRoomState(this.state));
  }

  _onError = ({error, errorOpen}) => {
    this.setState({error, errorOpen});
  }

  _onLoad = () => {
    this.setState({loading: false});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>
        <div className="appContainer">
          <ErrorSnackbar
            error={this.state.error}
            open={this.state.errorOpen}
            close={this._closeErrorSnackbar}
          />

          <LoadingOverlay enabled={this.state.loading}/>

          <Sidebar
            room={this.state.room}
            ideas={this.state.ideas}
            boardId={this.props.params.boardId}
          />

          <div className="dragContainer">
            <NavBar
              isAdmin={this._isAdmin()}
              boardId={this.props.params.boardId}
            />
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = dragDropContext(HTML5Backend)(RoomContainer);
