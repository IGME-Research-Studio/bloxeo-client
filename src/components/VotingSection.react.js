const Modal = require('boron/FadeModal');
const React = require('react');
const StormActions = require('../actions/StormActions');
const StormStore = require('../stores/StormStore');
const VoteButton = require('../components/VoteButton.react');
const VoteElement = require('../components/VoteElement.react');
const VotingResult = require('../components/VotingResult.react');

/**
 * Component for displaying and voting on ideas
 */
const VotingSection = React.createClass({
  /**
   * Set state to the first element of the array
   * @return {object} - initial state object
   */
  getInitialState: function() {
    return (
      {
        ideas: StormStore.getIdeaGroups(),
        voteIndex: 0,
        state: 'vote',
        hideIds: [],
      }
    );
  },
  /**
   * Invoked before initial render occurs
   */
  componentDidMount: function() {
    StormStore.addChangeListener(this._onChange);
  },
  /**
   * Invoked before component is unmounted from DOM
   */
  componentWillUnmount: function() {
    StormStore.removeChangeListener(this._onChange);
  },
  /**
   * Event handler for change events from StormStore
   */
  _onChange: function() {
    this.setState({ideas: StormStore.getIdeaGroups()});
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
   * Show voting modal
   */
  showModal: function() {
    if (this.getCurrentIdea()) {
      this.refs.modal.show();
    }
  },
  /**
   * Hide voting modal
   */
  hideModal: function() {
    this.refs.modal.hide();
    StormActions.hideIdeas(this.state.hideIds);
    this.state.hideIds = [];
  },
  /**
   * Change state on button click
   * @param {boolean} keep - whether or not to keep the idea
   */
  handleStateChange: function(keep) {
    if (!keep) {
      this.state.hideIds.push(this.state.voteIndex);
    }

    if (this.state.voteIndex === this.state.ideas.length - 1) {
      this.hideModal();
      this.setState({voteIndex: 0});
    } else {
      this.setState({voteIndex: this.state.voteIndex + 1});
    }
  },
  /**
   * Render component
   * @return {object}
   */
  render: function() {
    switch (this.state.state) {
    case 'vote':
      return (
        <div>
          <a className="button" onClick={this.showModal}>Vote</a>
          <Modal ref="modal">
            <div className="votingSection">
              <VoteElement idea={this.getCurrentIdea()} />
              <VoteButton data='true' changeState={this.handleStateChange} />
              <VoteButton data='false' changeState={this.handleStateChange} />
            </div>
          </Modal>
        </div>
      );
    case 'results':
      return (
        <div>
          <VotingResult />
        </div>
      );
    }
  },
});

module.exports = VotingSection;
