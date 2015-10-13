require('jquery-ui');
require('jquery-ui/draggable');
require('jquery-ui/droppable');
const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const $ = require('jquery');

const Wordbank = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaArray: this.props.data,
      }
    );
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        {this.props.data.map( function(item, i) {
          return <IdeaCard key={i} idea={item} owner={this} ideaID={i} />;
        })}
      </div>
    );
  },
});

module.exports = Wordbank;
