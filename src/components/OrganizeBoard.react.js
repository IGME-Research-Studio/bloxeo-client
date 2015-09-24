const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');

const OrganizeBoard = React.createClass({

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div>
        {this.props.ideas.map( function (item) {
          return <IdeaCard idea={item} />;
        })}
      </div>
    );
  }
});

module.exports = OrganizeBoard;
