const React = require('react');
const OrganizeBoard = require('../components/OrganizeBoard.react');
const VotingSection = require('../components/VotingSection.react');

const StormApp = React.createClass({
  getInitialState: function () {
    const ideaData = [
      { content: ['purple'], keep: true },
      { content: ['massive'], keep: true },
      { content: ['eye'], keep: true },
      { content: ['guava'], keep: true},
      { content: ['dinosaur'], keep: true },
      { content: ['kitten'], keep: true },
      { content: ['tattoos'], keep: true },
      { content: ['cake'], keep: true}
    ];
    return {
      ideas: ideaData
    };
  },
  /**
   * @return {object}
   */
  render: function () {
    return (
      <div>
        <VotingSection data={this.state.ideas} />
      </div>
    );
  }
});

module.exports = StormApp;
