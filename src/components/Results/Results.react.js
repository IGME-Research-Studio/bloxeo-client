const React = require('react');

const Result = require('./Result.react');

const BoardOptionsStore = require('../../stores/BoardOptionsStore');
const VotingResultsStore = require('../../stores/VotingResultsStore');
const StormActions = require('../../actions/StormActions');
const NavBarConstants = require('../../constants/NavBarConstants');

/**
 * Retrieve the current data from the VotingResultsStore
 */
function getStoreState() {
  return {
    results: VotingResultsStore.getResults(),
    showReturnToWorkspace: false,
  };
}

/**
 * Results Component
 */
const Results = React.createClass({
  /**
   * Get initial state of results component
   * @return {object}
   */
  getInitialState: function() {
    return getStoreState();
  },
  componentDidMount: function() {
    VotingResultsStore.addResultsChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    VotingResultsStore.removeResultsChangeListener(this._onChange);
  },
  /**
   * Event handler for 'change' events coming from the VotingResultsStore
   */
  _onChange: function() {
    this.setState(getStoreState());
  },
  /**
   * Get the selected results
   * @return {object[]} - an array of selected results
   */
  _getSelectedResults: function() {
    const returnCollections = this.state.results.filter(function(result) {
      if (result.selected) {
        return true;
      }
      return false;
    });

    return returnCollections;
  },
  /**
   * Called from Result child components when user selects or
   * deselects a result
   * @param {object} result - the result
   * @param {boolean} selected - set selected to true or false
   */
  handleSelect: function(result, selected) {
    result.selected = selected;
    const selectedResults = this._getSelectedResults();
    this.setState({
      showReturnToWorkspace: selectedResults.length > 0 ? true : false,
    });
  },
  /**
   * Return selected results to workspace
   */
  returnToWorkspace: function() {
    const results = this._getSelectedResults();
    if (results.length > 0) {
      StormActions.returnResults(results);
      StormActions.selectTab(NavBarConstants.WORKSPACE_TAB);

      for (let i = 0; i < results.length; i++) {
        results[i].selected = false;
      }
    }
  },
  /**
   * Render Results Component
   * @return {object}
   */
  render: function() {
    const that = this;
    const topResults = [];
    const otherResults = [];

    for (let i = 0; i < this.state.results.length; i++) {
      if (i < BoardOptionsStore.getNumReturnToWorkspace()) {
        topResults.push(this.state.results[i]);
      } else {
        otherResults.push(this.state.results[i]);
      }
    }

    return (
      <div className="results">
        <div>
          <h2 className="resultsHeading">The results are in!</h2>
          <div className="resultsControls">
            <a onClick={this.returnToWorkspace}
                className={
                  this.state.showReturnToWorkspace ? '' : 'is-disabled'
                }>
              Return to Workspace
            </a>
          </div>
        </div>
        <p>Top 3</p>
        {topResults.map(function(ideaCollection, i) {
          return (
            <Result collection={ideaCollection.collection}
                handleSelect={that.handleSelect} key={i} />
          );
        })}
        <p>Other Results</p>
        {otherResults.map(function(ideaCollection, i) {
          return (
            <Result collection={ideaCollection.collection}
                handleSelect={that.handleSelect} key={i} />
          );
        })}
      </div>
    );
  },
});

module.exports = Results;
