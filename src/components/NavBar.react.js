const React = require('react');
const Bootstrap = require('react-bootstrap');
const FontAwesome = require('react-fontawesome');
const NavBarTypes = require('../constants/NavBarConstants');
const StormActions = require('../actions/StormActions');

const DropdownButton = Bootstrap.DropdownButton;
const MenuItem = Bootstrap.MenuItem;
const cogIcon = <FontAwesome name="cog" size="lg" />;

/**
 * Navigation Bar Component
 */
const NavBar = React.createClass({
  /**
   * Set state to the first element of the array
   * @return {object} - initial state object
   */
  getInitialState: function() {
    return ({
      selectedTab: NavBarTypes.WORKSPACE_TAB,
    });
  },
  /**
   * Select the tab that was clicked
   * @param {object} - click event object
   */
  selectTab: function(e) {
    StormActions.selectTab(e.target.name);
  },
  /**
   * Render NavBar component
   * @return {object}
   */
  render: function() {
    const tabClass = 'navBarTab';
    const selectedTabClass = tabClass + ' is-selected';

    return (
      <div className="navBar">
        <a name={NavBarTypes.WORKSPACE_TAB}
            className={this.props.selectedTab === NavBarTypes.WORKSPACE_TAB ? selectedTabClass : tabClass}
            onClick={this.selectTab}>
          Workspace
        </a>
        <a name={NavBarTypes.RESULTS_TAB}
            className={this.props.selectedTab === NavBarTypes.RESULTS_TAB ? selectedTabClass : tabClass}
            onClick={this.selectTab}>
          Results
        </a>
        <DropdownButton bsStyle="link" id="room-cog" title={cogIcon} style={{float: 'right', margin: '1px 0'}} pullRight>
          <MenuItem header>Room Settings</MenuItem>
          <li role="presentation" className="dropdown-item">
            <input type="checkbox" /> <span className="dropdown-text">Choose color</span>
          </li>
          <MenuItem divider />
          <li role="presentation" className="dropdown-item">
            <input type="checkbox" /> <span className="dropdown-text">Allow invitations</span>
          </li>
          <MenuItem divider />
          <li role="presentation" className="dropdown-item">
            <input type="checkbox" /> <span className="dropdown-text">Disable timer restriction</span>
          </li>
          <MenuItem divider />
          <li role="presentation" className="dropdown-item">
            <input type="text" style={{width: '30px', border: 'none', borderBottom: '1px solid'}} /> <span className="dropdown-text">Number of top results kept</span>
          </li>
          <MenuItem divider />
          <li role="presentation" className="dropdown-item">
            <input type="checkbox" /> <span className="dropdown-text">Vote initiated by admin only</span>
          </li>
        </DropdownButton>
      </div>
    );
  },
});

module.exports = NavBar;
