import React from 'react';
import classNames from 'classnames';
import LoadingStore from '../stores/LoadingStore';

const LoadingOverlay = React.createClass({
  getInitialState: function() {
    return {
      disabled: this.props.disabled,
    };
  },
  componentDidMount: function() {
    LoadingStore.addLoadingListener(this.disable);
  },
  componentWillUnmount: function() {
    LoadingStore.removeLoadingListener(this.disable);
  },
  disable: function() {
    this.setState({disabled: true});
  },
  render: function() {
    const classToAdd = classNames('loadingOverlay',
                                  {active: !this.state.disabled});
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
  },
});

module.exports = LoadingOverlay;
