import React from 'react';
import Masonry from 'react-masonry-component';

import Result from './Result';

import BoardOptionsStore from '../../stores/BoardOptionsStore';
import VotingResultsStore from '../../stores/VotingResultsStore';
import { returnResults } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';

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
      d.dispatch(returnResults(results));

      // TODO: use browserHistory to push to results route

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
    const numReturn = BoardOptionsStore.getNumReturnToWorkspace();
    const results = this.state.results;

    results.sort(function(result1, result2) {
      if (result1.collection.votes < result2.collection.votes) {
        return 1;
      }
      else if (result1.collection.votes === result2.collection.votes) {
        return 0;
      }
      else {
        return -1;
      }
    });

    const resultElements = results.map(function(ideaCollection, i) {
      return (
        <Result collection={ideaCollection.collection}
          handleSelect={that.handleSelect}
          selectable={i < numReturn ? false : true}
          key={i} />
      );
    });

    return (
      <div className="results">
        <h2 className="resultsHeading">Results</h2>
        <div className="resultsRoomName">
          {BoardOptionsStore.getRoomName()}
        </div>
        <div className="resultsVoteTime">
          Voting Results for 11:00am on 11/2/15
        </div>
        <div className="resultsColumns">
          <Masonry>
            {resultElements}
          </Masonry>
        </div>
      </div>
    );
  },
});

module.exports = Results;
