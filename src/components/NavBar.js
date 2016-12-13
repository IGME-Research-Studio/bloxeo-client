import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import RoomOptions from './Modal/RoomOptions';

/**
 * Navigation Bar Component
 */
class NavBar extends React.Component {
  static propTypes = {
    isAdmin: React.PropTypes.bool.isRequired,
  };

  /**
   * Set state to the first element of the array
   * @return {object} - initial state object
   */
  state = {
    isOpen: false,
  };

  toggleRoomOptions = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeRoomOptions = () => {
    this.setState({ isOpen: false });
  };

  /**
   * Render NavBar component
   * @return {object}
   */
  render() {
    const tabClass = 'navBarTab';
    const selectedClass = 'is-selected';
    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(255, 255, 255 0)',
      },
      content: {
        top: '55px',
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
  }
}

NavBar.contextTypes = {
  router: PropTypes.object.isRequired,
};

module.exports = NavBar;
