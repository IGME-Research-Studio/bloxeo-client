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
  componentDidMount: function() {
    $('.drag').droppable({
      hoverClass: '.drop-zone',
      drop: this._drop,
    });
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
          return <IdeaCard key={i} idea={item} ideas={[item]} owner={this} ideaID={i} parentIdeaMerge={mergeFunction}/>;
        })}
      </div>
    );
  },
});

module.exports = Wordbank;
