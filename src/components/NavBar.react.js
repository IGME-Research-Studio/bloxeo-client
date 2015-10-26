const React = require('react');

const NavBarTypes = require('../constants/NavBarConstants');
const StormActions = require('../actions/StormActions');

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
      </div>
    );
  },
});

module.exports = NavBar;
