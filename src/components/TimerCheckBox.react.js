const React = require('react');
const StormActions = require('../actions/StormActions');

const TimerCheckBox = React.createClass({
  _onCheck: function(e) {
    StormActions.pauseTimer(e.target.checked);
  },
  render: function() {
    return (
      <input className='checkbox' type="checkbox" onChange={this._onCheck} />
    );
  },
});

module.exports = TimerCheckBox;
