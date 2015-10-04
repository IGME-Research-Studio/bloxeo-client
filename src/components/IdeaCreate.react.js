const React = require('react');
const StormActions = require('../actions/StormActions');

const IdeaCreate = React.createClass({
  /**
   * Handle submit and clear input box
   * @param {event} e
   */
  _onSubmit: function(e) {
    e.preventDefault();
    const ideaContent = React.findDOMNode(this.refs.idea).value;
    if (!ideaContent) {
      return;
    }
    StormActions.ideaCreate(ideaContent);
    React.findDOMNode(this.refs.idea).value = '';
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <form className="ideaCreate" onSubmit={this._onSubmit}>
        <input type="text" placeholder="Create Idea" ref="idea" />
        <input type="submit" value="Create" />
      </form>
    );
  },
});

module.exports = IdeaCreate;
