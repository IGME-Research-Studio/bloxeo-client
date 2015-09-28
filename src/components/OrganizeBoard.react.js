const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');

const OrganizeBoard = React.createClass({
<<<<<<< HEAD

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
=======
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaArray: this.props.data,
      }
    );
  },
  onIdeaMerge: function(item) {
    this.props.data.push(item);
    this.forceUpdate();
  },
  /**
   * @return {object}
   */
  render: function() {
    const mergeFunction = this.onIdeaMerge;
    return (
      <div>
        {this.props.data.map( function(item, i) {
          return <IdeaCard key={i} idea={item} owner={this} ideaID={i} parentIdeaMerge={mergeFunction}/>;
        })}
      </div>
    );
  },
>>>>>>> upstream/master
});

module.exports = OrganizeBoard;
