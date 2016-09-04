import React from 'react';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';

import VotingContent from './VotingContent';
import CollectionStore from '../../stores/CollectionStore';
import { CUSTOM_MODAL_STYLES } from '../../constants/appConstants';

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
    // TODO: show results tab via browserHistory
    browserHistory.push(`/room/${this.props.boardId}/results`)
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
          style={CUSTOM_MODAL_STYLES}
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
