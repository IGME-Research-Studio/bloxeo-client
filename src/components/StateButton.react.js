const React = require('react');

const StateButton = React.createClass({
  _onClick: function(e) {
    e.preventDefault();
    this.props.parentStateChange(this.props.nextState);
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <a className="button" onClick={this._onClick}>Next</a>
    );
  },
});

module.exports = StateButton;
