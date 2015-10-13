require('jquery-ui');
require('jquery-ui/draggable');
require('jquery-ui/droppable');
const React = require('react');
const $ = require('jquery');
const StormActions = require('../actions/StormActions');
const StormStore = require('../stores/StormStore');

const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      text: 'butts',
      x: 0,
      y: 0,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards
    $(React.findDOMNode(this.refs.ideaGroup)).draggable({
      snap: false,
      disabled: false, // will make not draggable
      containment: '.dragContainer',
      stack: '.draggable',
      cursor: 'move',
      drag: this._onDrag,
    });

    $(React.findDOMNode(this.refs.ideaGroup)).droppable({
      hoverClass: '.drop-zone',
      drop: this._onDrop,
    });

    StormStore.addGroupListener(this.groupChange);
  },
  groupChange: function() {
    this.setState({
      ideas: this.props.ideas,
    });
  },
  _style: function() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
    };
  },
  _onDrag: function() {
    StormActions.storeMovedIdea(this);
  },

  _onDrop: function() {
    StormActions.groupIdea(this);
  },

  render: function() {
    return (
      <div className="ideaGroup drop-zone" ref="ideaGroup">
        {this.state.ideas.map( function(idea) {
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
