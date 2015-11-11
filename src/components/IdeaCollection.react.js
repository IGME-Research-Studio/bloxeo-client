const React           = require('react');
const StormActions    = require('../actions/StormActions');
const CollectionStore = require('../stores/CollectionStore');
const dropTarget      = require('react-dnd').DropTarget;
const dragSource      = require('react-dnd').DragSource;
const PropTypes       = React.PropTypes;
const DnDTypes        = require('../constants/DragAndDropConstants');
const Idea            = require('./Idea.react');
const ReactDOM        = require('react-dom');
const d3              = require('d3');

const IdeaCollection = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },
  force: undefined,
  getInitialState: function() {
    return {
      left: this.props.left,
      top: this.props.top,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },
  componentDidMount: function() {
    CollectionStore.addChangeListener(this.ideasChange);

    this.force = d3.layout.force()
      .nodes(this.state.ideas.content)
      .charge(100)
      .gravity(0.02)
      .friction(0.6)
      .start();

    const domNode = ReactDOM.findDOMNode(this);
    this.force.size([domNode.offsetWidth, domNode.offsetHeight]);
  },
  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this.ideasChange);
  },
  _style: function() {
    return {
      top: `${this.props.top}px`,
      left: `${this.props.left}px`,
    };
  },

  ideasChange: function() {
    this.setState({
      ideas: CollectionStore.updateCollection(this.props.ideaID),
    });
    this.force.nodes(this.state.ideas.content).start();
  },

  render: function() {
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;
    const groupID = this.state.ideaID;
    const count = this.state.ideas.content.length;
    // Apply react DnD to element
    return connectDragSource(connectDropTarget(
      <div className="ideaGroup drop-zone" style={this._style()}>
        {this.state.ideas.content.map(function(idea, i) {
          return (
          <div className="workspaceCard draggable">
            <Idea content={idea.text}
                  ideaID={i}
                  groupID={groupID}
                  collectionCount={count}
                  top={idea.top}
                  left={idea.left}/>
          </div>
          );
        })}
      </div>
    ));
  },
});
// REACT-DnD
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION, DnDTypes.IDEA];
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
    // Do not execute drop on self
    if (props.ideaID === idea.id && idea.type !== 'IDEA') {
      return;
    }
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
  dropTarget(dropTypes, collectionTarget, targetCollect)(IdeaCollection)
);
