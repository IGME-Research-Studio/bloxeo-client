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
      y: 0, 
      ideas: this.props.ideas
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards
    console.log("did mount");
    console.log(React.findDOMNode(this.refs.ideaGroup));
    $(React.findDOMNode(this.refs.ideaGroup)).draggable({
      snap: false,
      disabled: false, //will make not draggable
      containment: ".dragContainer",
      stack: ".draggable"
    });

    /*$(".workspaceCard").draggable({
      snap: true, 
      connectToSortable: ".sortable",
      cursor: "move",
      cursorAt: { top: 56, left: 56 },
      disabled: false, //will make not draggable
      containment: ".ideaGroup",
      snapTolerance: 20, //default, 
      stack: ".draggable",
      drag: this._drag
    });*/

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

  _onDrop: function(event, ui) {
    var ideaToAdd = $(ui.draggable).context.textContent;
    var tempIdeas = this.state.ideas;
    tempIdeas.push({text: ideaToAdd});
    this.setState({ 
      ideas: tempIdeas
    });
  },

  render: function() {
    const groupString = this.props.text;

    return (
      <div className="ideaGroup drop-zone" ref="ideaGroup">
        {this.state.ideas.map( function(idea, i) {
          return (
          <div className="workspaceCard draggable">
            {idea.text}
          </div>
          );
        })}
      </div>
    );
  },
});

module.exports = IdeaGroup;
