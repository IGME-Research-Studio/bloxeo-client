const React = require('react');
//const IdeaCard = require('../components/IdeaCard.react');
// const jqueryUI = require('jquery-ui');
// const jqueryDraggable = require('jquery-ui/draggable');
// const jqueryDroppable = require('jquery-ui/droppable');
//const jqueryDroppable = require('jquery-ui/sortable');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaArray: this.props.data,
      }
    );
  },
  _duplicateCard: function() {
    console.log("duplicated");
    return React.addons.cloneWithProps(element, {style: {color: 'blue'}});
  },

  onIdeaMerge: function(item) {
    this.props.data.push(item);
    this.forceUpdate();
  },

  _onDrop: function(event, ui) {
    console.log(ui);
    React.children.map(this.props.children, this._duplicateCard);
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
