const React = require('react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      text: "butts",
      x: 0,
      y: 0
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards
    $(".workspaceCard").draggable({
      snap: true, 
      connectToSortable: ".sortable",
      cursor: "move",
      cursorAt: { top: 56, left: 56 },
      disabled: false, //will make not draggable
      containment: ".dragContainer",
      snapTolerance: 20, //default, 
      stack: ".draggable",
      drag: this._drag
    });

    $(".draggable").droppable({
      hoverClass: ".drop-zone",
      drop: this._onDrop,
      over: this._over
    });
  },
  _style: function() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
    };
  },

  render: function() {
    const groupString = this.props.text;
    console.log(groupString);
    return (
      <div className="workspaceCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
          {groupString}
      </div>
    );
  },
});

module.exports = IdeaGroup;
