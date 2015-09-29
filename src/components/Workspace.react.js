const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
// const jqueryUI = require('jquery-ui');
// const jqueryDraggable = require('jquery-ui/draggable');
// const jqueryDroppable = require('jquery-ui/droppable');

const Workspace = React.createClass({
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
      <div className>
        
      </div>
    );
  },
});

module.exports = Workspace;
