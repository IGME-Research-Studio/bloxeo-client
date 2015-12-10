const Modal = require('boron/FadeModal');
const React = require('react');
const VotingContent = require('./VotingContent.react');

/**
 * Component including a Vote button that opens the Voting modal
 */
const VotingModal = React.createClass({
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
    this.uncheck();
  },
  /**
   * Uncheck the 'Ready to Vote' checkbox
   */
  uncheck: function() {
    this.refs.checkbox.checked = false;
  },
  /**
   * Render VotingModal component
   * @return {object}
   */
  render: function() {
    return (
      <div className="sidebar-voteSection">
        <a className="button callVoteButton" onClick={this.showModal}>
          Call Vote
        </a>
        <div className="waitingSection">
          <span className="waitingText">Waiting on</span>
          <span className="waitingCircle"></span>
          <span className="waitingCircle"></span>
        </div>

        <Modal ref="modal" onHide={this.uncheck}>
          <div className="votingContent">
            <VotingContent hideModal={this.hideModal} />
          </div>
        </Modal>
      </div>
    );
  },
});

module.exports = VotingModal;
