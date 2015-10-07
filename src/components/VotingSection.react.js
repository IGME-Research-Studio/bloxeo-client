const React = require('react');
const VotingResult = require('../components/VotingResult.react');
const VoteButton = require('../components/VoteButton.react');
const VoteElement = require('../components/VoteElement.react');
const Modal = require('boron/FadeModal');

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
        currentIdea: this.props.data[0].content,
        votesCast: 0,
        state: 'vote',
      }
    );
  },
  /**
   * Show voting modal
   */
  showModal: function() {
    this.refs.modal.show();
  },
  /**
   * Hide voting modal
   */
  hideModal: function() {
    this.refs.modal.hide();
  },
  /**
   * Change state on button click
   * @param {boolean} keep - whether or not to keep the idea
   */
  handleStateChange: function(keep) {
    if (!keep) {
      this.props.data[this.state.votesCast].keep = false;
    }

    this.state.votesCast++;
    if (this.state.votesCast === this.props.data.length) {
      this.hideModal();
    } else {
      this.setState({currentIdea: this.props.data[this.state.votesCast].content});
    }
  },
  render: function() {
    switch (this.state.state) {
    case 'vote':
      return (
        <div>
          <a className="button" onClick={this.showModal}>Vote</a>
          <Modal ref="modal">
            <div className="votingSection">
              <VoteElement idea={this.state.currentIdea} />
              <VoteButton data='true' changeState={this.handleStateChange} />
              <VoteButton data='false' changeState={this.handleStateChange} />
            </div>
          </Modal>
        </div>
      );
    case 'results':
      return (
        <div>
          <VotingResult data={this.props.data} />
        </div>
      );
    }
  },
});

module.exports = VotingSection;
