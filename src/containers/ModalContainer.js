import React, { PropTypes }  from 'react';
import { browserHistory } from 'react-router';
import { isNil } from 'ramda';

import StatelessModal from '../components/StatelessModal';
import ModalHeader from '../components/Modal/ModalHeader';

const propTypes = {
  children: PropTypes.element.isRequired,
  headerText: PropTypes.string.isRequired,
  restorePath: PropTypes.string,
};

class ModalContainer extends React.Component {

  /*
   * In some cases modals have dynamic parents, in which case we just want
   * to go back in history. However this is slightly dangerous since the
   * history might not be the parent (e.g. they just typed in the URL from a
   * browser.
   * The current solution to this is to prefer passing in a `restorePath` prop
   * on instantiation and only fallback to the `goBack` method when that is
   * not possible.
   */
  closeModal = () => {
    if (isNil(this.props.restorePath)) {
      return browserHistory.goBack();
    }
    else {
      return browserHistory.push(this.props.restorePath);
    }
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
