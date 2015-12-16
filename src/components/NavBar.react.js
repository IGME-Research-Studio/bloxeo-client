const React = require('react');
const Modal = require('react-modal');
const FontAwesome = require('react-fontawesome');
const StormActions = require('../actions/StormActions');
const NavBarTypes = require('../constants/NavBarConstants');
const RoomOptions = require('./Modal/RoomOptions.react');

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
      selectedTab: NavBarTypes.WORKSPACE_TAB,
      isOpen: false,
    };
  },
  /**
   * Select the tab that was clicked
   * @param {object} - click event object
   */
  selectTab: function(e) {
    StormActions.selectTab(e.target.name);
  },

  toggleRoomOptions: function() {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
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
    const selectedTabClass = tabClass + ' is-selected';
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
        <a name={NavBarTypes.WORKSPACE_TAB}
            className={
              this.props.selectedTab === NavBarTypes.WORKSPACE_TAB ?
              selectedTabClass : tabClass
            }
            onClick={this.selectTab}>
          Workspace
        </a>
        <a name={NavBarTypes.RESULTS_TAB}
            className={
              this.props.selectedTab === NavBarTypes.RESULTS_TAB ?
              selectedTabClass : tabClass
            }
            onClick={this.selectTab}>
          Results
        </a>
        <button onClick={this.toggleRoomOptions} style={cogStyle} className="cogButton">
          <FontAwesome name="cog" size="lg" />
        </button>

        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeRoomOptions}
          style={customStyles}>
          <RoomOptions />
        </Modal>
      </div>
    );
  },
});

module.exports = NavBar;
