const React = require('react');
const IdeaList = require('./IdeaList.react');
const IdeaCreate = require('./IdeaCreate.react');

const IdeaBox = React.createClass({
  /**
   * Update view after creating new idea element
   */
  handleUpdate: function() {
    this.forceUpdate();
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <div id="right">
          <IdeaCreate onIdeaSubmit={this.handleUpdate} />
        </div>
      </div>
    );
  },
});

module.exports = IdeaBox;
