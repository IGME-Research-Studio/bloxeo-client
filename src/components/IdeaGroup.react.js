const React        = require('react');
const StormActions = require('../actions/StormActions');
const StormStore   = require('../stores/StormStore');
const dropTarget   = require('react-dnd').DropTarget;
const dragSource   = require('react-dnd').DragSource;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../constants/DragAndDropConstants');
const Idea         = require('./Idea.react');

const IdeaGroup = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      left: this.props.left,
      top: this.props.top,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },
  componentDidMount: function() {
    StormStore.addGroupListener(this.ideasChange);
  },
  componentWillUnmount: function() {
    StormStore.removeGroupListener(this.ideasChange);
  },
  _style: function() {
    return {
      top: `${this.props.top}px`,
      left: `${this.props.left}px`,
    };
  },

  ideasChange: function() {
    this.setState({
      ideas: StormStore.updateIdeaGroup(this.props.ideaID),
    });
  },

  render: function() {
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;
    const groupID = this.state.ideaID;
    // Apply react DnD to element
    return connectDragSource(connectDropTarget(
      <div className="ideaGroup drop-zone" style={this._style()}>
        {this.state.ideas.content.map(function(idea, i) {
          return (
          <div className="workspaceCard draggable">
            <Idea idea={idea} ideaID={i} groupID={groupID}/>
          </div>
          );
        })}
      </div>
    ));
  },
});
// REACT-DnD
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];
// DropTarget parameters
const collectionTarget = {
  // Only allow drop from collections with one idea
  canDrop: function(props, monitor) {
    const idea = monitor.getItem();
    return (idea.ideaCount === 1);
  },
  // Group ideas on drop
  drop: function(props, monitor) {
    const idea = monitor.getItem();
    StormActions.groupIdea(props.ideaID, idea);
    // Remove combined collection
    if (idea.type === DnDTypes.COLLECTION) {
      StormActions.removeCollection(idea.id);
    }
  },
};
function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}
// DragSource parameters
const collectionSource = {
  beginDrag: function(props) {
    // Return the data describing the dragged item
    return {
      content: props.ideas.content[0],
      type: DnDTypes.COLLECTION,
      id: props.ideaID,
      ideaCount: props.ideas.content.length,
    };
  },
};
function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = dragSource(DnDTypes.COLLECTION, collectionSource, dragCollect)(
  dropTarget(dropTypes, collectionTarget, targetCollect)(IdeaGroup)
);
