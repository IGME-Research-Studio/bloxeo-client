import React from 'react';

import CreateForm from '../components/Modal/CreateForm.react';
import StatelessModal from '../components/StatelessModal.react';
import { browserHistory } from 'react-router';

const CreateRoomContainer = React.createClass({

  closeModal: function() {
    browserHistory.goBack();
  },

  render: function() {
    return (
      <StatelessModal onClose={this.closeModal}>
        <CreateForm onClose={this.closeModal} />
      </StatelessModal>
    );
  },
});

module.exports = CreateRoomContainer;
