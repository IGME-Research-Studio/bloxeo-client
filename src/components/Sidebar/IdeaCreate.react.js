const React = require('react');
const StormActions = require('../../actions/StormActions');

const ENTER_KEY_CODE = 13;

const IdeaCreate = React.createClass({
  getInitialState: function() {
    return {
      value: '',
    };
  },
  /**
   * @param {object} event
   */
  _onChange: function(event) {
    this.setState({
      value: event.target.value,
    });
  },
  /**
   * @param {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._onSave();
    }
  },
  /**
   * Handle submit and clear input box
   */
  _onSave: function() {
    if (this.state.value === '') {
      return;
    }
    StormActions.ideaCreate(this.state.value);
    this.setState({
      value: '',
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    const isTimerDisabled = this.props.timerStatus;
    return (
      <div className="sidebar-create">
        <input
          type="text"
          maxLength="30"
          className={isTimerDisabled ?
            'idea-create is-disabled' : 'idea-create'}
          placeholder='Enter your ideas here'
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          disabled={isTimerDisabled}
          autoFocus={!isTimerDisabled}
        />
        <a className={isTimerDisabled ?
          'enterButton is-disabled' : 'enterButton'}
          onClick={this._onSave}>
          <i className="fa fa-arrow-up"></i>
        </a>
      </div>
    );

  },
});

module.exports = IdeaCreate;
