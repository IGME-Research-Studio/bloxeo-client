import React, { PropTypes }  from 'react';
import { browserHistory } from 'react-router';

import StatelessModal from '../components/StatelessModal.react';
import ModalHeader from '../components/Modal/ModalHeader.react';

const propTypes = {
  children: PropTypes.element.isRequired,
  headerText: PropTypes.string.isRequired,
};

class ModalContainer extends React.Component {

  closeModal() {
    browserHistory.goBack();
  }

  render() {
    const { children, headerText } = this.props;

    return (
      <StatelessModal onClose={this.closeModal}>
        <div>
          <ModalHeader
            onClose={this.closeModal}
            title={headerText}
          />
          {children}
        </div>
      </StatelessModal>
    );
  }
}

ModalContainer.propTypes = propTypes;
export default ModalContainer;
