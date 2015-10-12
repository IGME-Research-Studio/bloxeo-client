const React = require('react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const StormActions = require('../actions/StormActions');
const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      text: "butts",
      x: 0,
      y: 0, 
      ideas: this.props.ideas
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards
    $(React.findDOMNode(this.refs.ideaGroup)).draggable({
      snap: false,
      disabled: false, //will make not draggable
      containment: ".dragContainer",
      stack: ".draggable",
      cursor: "move",
      drag: this._onDrag
    });

    $(React.findDOMNode(this.refs.ideaGroup)).droppable({
      hoverClass: ".drop-zone",
      drop: this._onDrop
    });
  },
  _style: function() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
    };
  },
  _onDrag: function() {
    StormActions.storeGroupedIdea(this);
  },

  _onDrop: function(event, ui) {
    StormActions.groupIdea(this);
  },

  render: function() {
    return (
      <div className="ideaGroup drop-zone" ref="ideaGroup">
        {this.state.ideas.map( function(idea, i) {
          return (
          <div className="workspaceCard draggable">
            {idea}
          </div>
          );
        })}
      </div>
    );
  },
});

module.exports = IdeaGroup;
