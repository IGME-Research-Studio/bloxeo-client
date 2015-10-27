const React = require('react');
const StormActions = require('../actions/StormActions');
const CollectionStore = require('../stores/CollectionStore');
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
      hideIds: [],
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
  getCurrentIdea: function() {
    if (this.state.ideas.length === 0) {
      return null;
    }
    return this.state.ideas[this.state.voteIndex];
  },
  /**
   * Change state on button click
   * @param {boolean} keep - whether or not to keep the idea
   */
  handleStateChange: function(keep) {
    const hideIds = [];

    if (!keep) {
      this.getCurrentIdea().keep = false;
      hideIds.push(this.state.voteIndex);
      this.setState({hideIds: hideIds});
    }

    if (this.state.voteIndex === this.state.ideas.length - 1) {
      this.setState({label: 'results'});
    } else {
      this.setState({voteIndex: this.state.voteIndex + 1});
    }
  },
  /**
   * Pass hideIds to the Store and reset data
   */
  processVotes: function() {
    StormActions.hideIdeas(this.state.hideIds);
    this.props.hideModal();

    // reset state
    this.setState({voteIndex: 0, hideIds: []});
  },
  /**
   * Render VotingContent component
   * @return {object}
   */
  render: function() {
    if (!this.getCurrentIdea()) {
      return (
        <p>There is nothing to vote on yet. Drag some ideas onto the board
        to start voting!</p>
      );
    }

    switch (this.state.label) {
    case 'vote':
      return (
        <div>
          <VoteElement idea={this.getCurrentIdea()} />
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
