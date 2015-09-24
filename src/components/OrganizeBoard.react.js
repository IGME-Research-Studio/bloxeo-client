const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');

const OrganizeBoard = React.createClass({

  /**
   * @return {object}
   */
  render: function () {
    let idea1 = this.props.ideas[0];
    let idea2 = this.props.ideas[1];
    
    return (
      <div>
        <IdeaCard idea={idea1} />
        <IdeaCard idea={idea2} />
      </div>
    );
  }
});

module.exports = OrganizeBoard;
