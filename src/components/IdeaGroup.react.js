const React        = require('react');
const StormActions = require('../actions/StormActions');
const Idea = require('./Idea.react');
const StormStore   = require('../stores/StormStore');
const dropTarget   = require('react-dnd').DropTarget;
const dragSource   = require('react-dnd').DragSource;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../constants/DragAndDropConstants');

const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      left: this.props.left,
      top: this.props.top,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },

  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards
    StormStore.addGroupListener(this.ideasChange);
  },
  _onDrag: function() {
    StormActions.storeMovedIdea(this);
  },

  _onDrop: function() {
    StormActions.groupIdea(this);
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
    const groupID = this.state.ideaID;
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;

    return connectDragSource(connectDropTarget(
      <div className="ideaGroup drop-zone" style={this._style()}>
        {this.state.ideas.content.map(function(idea) {
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

const collectionTarget = {
  canDrop: function(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return (item.ideaCount === 1);
  },
  drop: function(props, monitor) {
    const idea = monitor.getItem();
    StormActions.groupIdea(props.ideaID, idea);
  },
};

const collectionDrag = {
  beginDrag: function(props) {
    // Return the data describing the dragged item
    return {content: props.ideas.content[0], type: DnDTypes.COLLECTION, id: props.ideaID, ideaCount: props.ideas.content.length};
  },
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];

module.exports = dragSource(DnDTypes.COLLECTION, collectionDrag, collect)(dropTarget(dropTypes, collectionTarget, collectTarget)(IdeaGroup));
