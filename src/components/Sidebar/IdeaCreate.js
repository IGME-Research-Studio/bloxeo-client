import React from 'react';

import { createIdea } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';

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
    d.dispatch(createIdea({ content: this.state.value }));
    this.setState({ value: '' });
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sidebar-create">
        <input
          type="text"
          maxLength="30"
          className={'idea-create'}
          placeholder='Enter your ideas here'
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          autoFocus
        />
        <a className={'enterButton'}
          onClick={this._onSave}>
          <i className="fa fa-arrow-up"></i>
        </a>
      </div>
    );

  },
});

module.exports = IdeaCreate;
