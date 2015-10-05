const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const IdeaGroup = require('./IdeaGroup.react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroupArray: this.props.data,
      }
    );
  },
  componentDidMount: function(){
    $(".droppable").droppable({
      hoverClass: ".drop-zone",
      drop: this._drop
    });
  },
  _drop: function(event, ui) {
    var group = {text: ui.draggable[0].innerHTML, x:event.clientX, y:event.clientY};
    console.log(group);

    const data = this.props.data;
    data.push(group);
    this.forceUpdate();

    const groups = this.props.data.map( function(groups) {
      return (
        <IdeaGroup>{groups.content}</IdeaGroup>
      );
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="droppable workspace">
        {this.props.data.map( function(group, i) {
          return <p>Text: {group.text} X: {group.x} Y: {group.y}</p>;
        })}
      </div>
    );
  },
});

module.exports = Workspace;
