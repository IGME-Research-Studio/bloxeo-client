import React from 'react';

import { hideCollections, storeResults } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';
import BoardOptionsStore from '../../stores/BoardOptionsStore';
import CollectionStore from '../../stores/CollectionStore';
import VoteButton from './VoteButton';
import VoteCollection from './VoteCollection';

/**
 * Component for voting 'Yes' or 'No' and displaying results
 */
const VotingContent = React.createClass({
  /**
   * Set state to the first element of the array
   * @return {object} - initial state object
   */
  getInitialState: function() {
    return ({
      collections: CollectionStore.getAllCollections(),
      voteIndex: 0,
    });
  },

  /**
   * Invoked before initial render occurs
   */
  componentDidMount: function() {
    CollectionStore.addChangeListener(this._onChange);
  },

  /**
   * Invoked before component is unmounted from DOM
   */
  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this._onChange);
  },

  /**
   * Event handler for change events from StormStore
   */
  _onChange: function() {
    this.setState({collections: CollectionStore.getAllCollections()});
  },

  /**
   * @return {object} - the current collection to display
   */
  _getCurrentCollection: function() {
    if (this.state.collections.length === 0) {
      return null;
    }
    const currId = Object.keys(this.state.collections)[this.state.voteIndex];
    return this.state.collections[currId];
  },

  /**
   * Sort collections by number of votes
   */
  _getSortedCollections: function() {
    const self = this;
    const keys = Object.keys(this.state.collections);
    const sorted = keys.map(function(key) {
      return {
        id: key,
        collection: self.state.collections[key],
      };
    });

    sorted.sort(function(idea1, idea2) {
      if (idea1.votes < idea2.votes) {
        return 1;
      }
      else if (idea1.votes === idea2.votes) {
        return 0;
      }
      else {
        return -1;
      }
    });

    return sorted;
  },
  /**
   * Get an array of ids of the ideaCollection not in the top number of
   * vote results to return to the workspace.
   * @return {array} - sorted array of collection objects
   * @return {array} - ids to hide
   */
  _getHideIds: function(sorted) {
    const numReturnToWorkspace = BoardOptionsStore.getNumReturnToWorkspace();
    const hideIds = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i >= numReturnToWorkspace) {
        hideIds.push(sorted[i].id);
      }
    }

    return hideIds;
  },
  /**
   * Change state on button click
   * @param {boolean} keep - whether or not to keep the idea
   */
  handleStateChange: function(upvote) {
    const collection = this._getCurrentCollection();
    const collectionSize = Object.keys(this.state.collections).length;

    if (upvote) {
      collection.votes += 1;
    }

    if (this.state.voteIndex === collectionSize - 1) {
      // store voting results
      const sortedCollections = this._getSortedCollections();
      d.dispatch(storeResults(sortedCollections));

      // remove non-top voted ideaCollections from the Workspace
      const hideIds = this._getHideIds(sortedCollections);
      d.dispatch(hideCollections(hideIds));

      this.props.hideModal();
    }
    else {
      this.setState({voteIndex: this.state.voteIndex + 1});
    }
  },
  /**
   * Render VotingContent component
   * @return {object}
   */
  render: function() {
    const voteIndex = this.state.voteIndex;
    const numCollections = Object.keys(this.state.collections).length;

    return (
      <div>
        <div className="modalHeading">
          Voting
          <span className="voteProgress">
            {(voteIndex + 1) + '/' + numCollections} groups
          </span>
        </div>
        <div className="votingModal-content">
          <VoteCollection collection={this._getCurrentCollection()} />
          <div className="voteButton-section">
            <VoteButton data='true' changeState={this.handleStateChange} />
            <VoteButton data='false' changeState={this.handleStateChange} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports = VotingContent;
