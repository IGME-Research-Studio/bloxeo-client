import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  enabled: PropTypes.bool.isRequired,
};

const LoadingOverlay = ({enabled}) => {
  const classToAdd = classNames('loadingOverlay', {active: enabled});
  return (
    <section className={classToAdd}>
      <div className="loadingAnimation">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </section>
  );
};

LoadingOverlay.propTypes = propTypes;
export default LoadingOverlay;

