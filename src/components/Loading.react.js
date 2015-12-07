const React = require('react');
const classNames = require('classnames');

const LoadingOverlay = React.createClass({
  getInitialState: function() {
    return {
      disabled: this.props.disabled,
    };
  },
  disable: function() {
    this.state.disabled = true;
  },
  render: function() {
    const classToAdd = classNames('loadingOverlay', {active: !this.state.disabled});
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
