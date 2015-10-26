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
      <div>
        <div className="sidebar-vote">
          <input ref="checkbox" className="vote-check" type="checkbox" onChange={this.showModal} />
          <span className="vote-text">Lets vote on these!</span>
          <p className="vote-waiting">Waiting for... 2 people.</p>
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
