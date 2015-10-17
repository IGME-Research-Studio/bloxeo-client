const React = require('react');
const IdeaCreate = require('./IdeaCreate.react');

const IdeaBox = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="ideaBox">
        <IdeaCreate timerStatus={this.props.timerStatus} />
      </div>
    );
  },
});

module.exports = IdeaBox;
