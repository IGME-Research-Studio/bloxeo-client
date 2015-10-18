const Modal = require('boron/FadeModal');
const React = require('react');
const VotingContent = require('../components/VotingContent.react');

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
  },
  /**
   * Render VotingModal component
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <a className="button" onClick={this.showModal}>Vote</a>
        <Modal ref="modal">
          <div className="votingContent">
            <VotingContent hideModal={this.hideModal} />
          </div>
        </Modal>
      </div>
    );
  },
});

module.exports = VotingModal;
