const React = require('react');
const IdeaList = require('./IdeaList.react');
const IdeaCreate = require('./IdeaCreate.react');

const IdeaBox = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="ideaBox">
        <IdeaList ideas={this.props.ideas} />
        <IdeaCreate timerStatus={this.props.timerStatus} />
      </div>
    );
  },
});

module.exports = IdeaBox;
