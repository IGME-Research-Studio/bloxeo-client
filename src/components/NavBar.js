import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';
  import { Link } from 'react-router';

import d from '../dispatcher/AppDispatcher';
import NavBarTypes from '../constants/NavBarConstants';
import RoomOptions from './Modal/RoomOptions';

/**
 * Navigation Bar Component
 */
const NavBar = React.createClass({
  /**
   * Set state to the first element of the array
   * @return {object} - initial state object
   */
  getInitialState: function() {
    return {
      isOpen: false,
    };
  },

  propTypes: {
    isOnWorkspace: React.PropTypes.bool.isRequired,
    isAdmin: React.PropTypes.bool.isRequired,
  },

  toggleRoomOptions: function() {
    this.setState({ isOpen: !this.state.isOpen, });
  },

  closeRoomOptions: function() {
    this.setState({ isOpen: false });
  },

  /**
   * Render NavBar component
   * @return {object}
   */
  render: function() {
    const tabClass = 'navBarTab';
    const selectedClass = 'is-selected';
    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(255, 255, 255 0)',
      },
      content: {
        top: '44px',
        left: 'auto',
        right: '0',
        bottom: 'auto',
        width: '250px',
        padding: '0',
        border: '0',
        borderRadius: '2px',
        boxShadow: '-1px 1px 1px #ddd',
        overflow: 'hidden',
      },
    };

    const roomOptionsState = this.state.isOpen;
    let cogStyle = {
      WebkitTransform: 'rotate(0)',
      msTransform: 'rotate(0)',
      transform: 'rotate(0)',
      WebkitTransition: 'all .2s',
      msTransition: 'all .2s',
      transition: 'all .2s',
    };
    if (roomOptionsState) {
      cogStyle = {
        WebkitTransform: 'rotate(18deg)',
        msTransform: 'rotate(18deg)',
        transform: 'rotate(18deg)',
        WebkitTransition: 'all .2s',
        msTransition: 'all .2s',
        transition: 'all .2s',
      };
    }

    return (
      <div className="navBar">
        <Link
          to={`/room/${this.props.boardId}/workspace`}
          className={tabClass}
          activeClassName={selectedClass}>

          Workspace
        </Link>

        <Link
          to={`/room/${this.props.boardId}/results`}
          className={tabClass}
          activeClassName={selectedClass}>

          Results
        </Link>

        {this.props.isAdmin ?
          <span>
            <button
              onClick={this.toggleRoomOptions}
              style={cogStyle}
              className="cogButton"
            >

              <FontAwesome name="cog" size="lg" />
            </button>

            <Modal
              isOpen={this.state.isOpen}
              onRequestClose={this.closeRoomOptions}
              style={customStyles}>
              <RoomOptions
                onSubmit={this.closeRoomOptions}
              />
            </Modal>
          </span>
        :
          null
        }
      </div>
    );
  },
});

NavBar.contextTypes = {
  router: PropTypes.object.isRequired,
}

module.exports = NavBar;
