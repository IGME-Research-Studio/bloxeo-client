const React = require('react');
const Modal = require('react-modal');
const VotingContent = require('./VotingContent.react');
const CollectionStore = require('../../stores/CollectionStore');
const StormConstants = require('../../constants/StormConstants.js');

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
    const collections = CollectionStore.getAllCollections();
    if (Object.keys(collections).length > 0) {
      this.setState({showModal: true});
    }
  },

  /**
   * Hide voting modal
   */
  hideModal: function() {
    this.setState({showModal: false});
  },

  // <div className="waitingSection">
  //   <span className="waitingText">Waiting on</span>
  //   <span className="waitingCircle"></span>
  //   <span className="waitingCircle"></span>
  // </div>

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
