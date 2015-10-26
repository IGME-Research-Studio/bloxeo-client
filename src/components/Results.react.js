const React = require('react');

const Result = require('./Result.react');
const BoardOptionsStore = require('../stores/BoardOptionsStore');
const VotingResultsStore = require('../stores/VotingResultsStore');

/**
 * Retrieve the current data from the VotingResultsStore
 */
function getStoreState() {
  return {
    results: VotingResultsStore.getResults(),
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
   * Render Results Component
   * @return {object}
   */
  render: function() {
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
        <h2>The results are in!</h2>
        <p>Top 3</p>
        {topResults.map(function(ideaCollection) {
          return (
            <Result ideaCollection={ideaCollection} />
          );
        })}
        <p>Other Results</p>
        {otherResults.map(function(ideaCollection) {
          return (
            <Result ideaCollection={ideaCollection} />
          );
        })}
      </div>
    );
  },
});

module.exports = Results;
