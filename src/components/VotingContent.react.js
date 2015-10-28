const React = require('react');
const StormActions = require('../actions/StormActions');
const BoardOptionsStore = require('../stores/BoardOptionsStore');
const CollectionStore = require('../stores/CollectionStore');
const NavBarConstants = require('../constants/NavBarConstants');
const VoteButton = require('../components/VoteButton.react');
const VoteElement = require('../components/VoteElement.react');
const VotingResult = require('../components/VotingResult.react');

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
      ideas: CollectionStore.getAllCollections(),
      voteIndex: 0,
      label: 'vote',
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
    this.setState({ideas: CollectionStore.getAllCollections()});
  },
  /**
   * @return {object} - the current idea to display
   */
  _getCurrentIdea: function() {
    if (this.state.ideas.length === 0) {
      return null;
    }
    return this.state.ideas[this.state.voteIndex];
  },
  /**
   * Sort ideas by number of votes
   */
  _sortIdeas: function() {
    this.state.ideas.sort(function(idea1, idea2) {
      if (idea1.votes < idea2.votes) {
        return 1;
      } else if (idea1.votes === idea2.votes) {
        return 0;
      } else {
        return -1;
      }
    });
  },
  /**
   * Get an array of ids of the ideaCollection not in the top number of
   * vote results to return to the workspace.
   * @return {array} - ids to hide
   */
  _getHideIds: function() {
    const numReturnToWorkspace = BoardOptionsStore.getNumReturnToWorkspace();
    const hideIds = [];

    for (let i = 0; i < this.state.ideas.length; i++) {
      if (i >= numReturnToWorkspace) {
        hideIds.push(this.state.ideas[i].index);
      }
    }

    return hideIds;
  },
  /**
   * Change state on button click
   * @param {boolean} keep - whether or not to keep the idea
   */
  handleStateChange: function(upvote) {
    const idea = this._getCurrentIdea();

    if (upvote) {
      idea.votes += 1;
    }

    if (this.state.voteIndex === this.state.ideas.length - 1) {
      this._sortIdeas();

      // store voting results
      StormActions.storeResults(this.state.ideas);

      // remove non-top voted ideaCollections from the Workspace
      const hideIds = this._getHideIds();
      StormActions.hideIdeas(hideIds);

      // show results tab
      StormActions.selectTab(NavBarConstants.RESULTS_TAB);

      this.props.hideModal();
    } else {
      this.setState({voteIndex: this.state.voteIndex + 1});
    }
  },
  /**
   * Render VotingContent component
   * @return {object}
   */
  render: function() {
    if (!this._getCurrentIdea()) {
      return (
        <p>There is nothing to vote on yet. Drag some ideas onto the board
        to start voting!</p>
      );
    }

    switch (this.state.label) {
    case 'vote':
      return (
        <div>
          <VoteElement idea={this._getCurrentIdea()} />
          <VoteButton data='true' changeState={this.handleStateChange} />
          <VoteButton data='false' changeState={this.handleStateChange} />
        </div>
      );
    case 'results':
      return (
        <div>
          <VotingResult data={this.state.ideas} />
          <a className="button" onClick={this.processVotes}>Done</a>
        </div>
      );
    default:
      break;
    }
  },
});

module.exports = VotingContent;
