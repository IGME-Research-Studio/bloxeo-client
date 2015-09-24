const React = require('react');
const OrganizeBoard = require('../components/OrganizeBoard.react');

const StormApp = React.createClass({
  getInitialState: function () {
    const idea1 = {
      content: ['peter'],
      keep: true
    };
    const idea2 = {
      content: ['ryan'],
      keep: true
    };

    const generatedIdeas = [idea1, idea2];
    return {
      ideas: generatedIdeas
    };
  },
  /**
   * @return {object}
   */
  render: function () {
    return (
      <div>
        <OrganizeBoard ideas={this.state.ideas} />
      </div>
    );
  }
});

module.exports = StormApp;
