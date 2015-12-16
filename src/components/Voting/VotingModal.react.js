const React = require('react');
const Modal = require('react-modal');
const VotingContent = require('./VotingContent.react');
const StormConstants = require('../../constants/StormConstants');
const StormActions = require('../../actions/StormActions');

/**
 * Component including a Vote button that opens the Voting modal
 */
const VotingModal = React.createClass({
  getInitialState: function() {
    return {
      showModal: false,
    };
  },
  /**
   * Show voting modal
   */
  showModal: function() {
    StormActions.readyUser();
    // StormActions.getVotingItems();
    // this.setState({showModal: true});
  },
  /**
   * Hide voting modal
   */
  hideModal: function() {
    this.setState({showModal: false});
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

        <Modal isOpen={this.state.showModal}
          style={StormConstants.CUSTOM_MODAL_STYLES}
          onClick={this.hideModal}>
          <div className="votingModal">
            <VotingContent hideModal={this.hideModal} />
          </div>
        </Modal>
      </div>
    );
  },
});

module.exports = VotingModal;
