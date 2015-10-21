const React        = require('react');
const IdeaGroup    = require('./IdeaGroup.react');
const StormActions = require('../actions/StormActions');
const StormStore   = require('../stores/StormStore');
const dropTarget   = require('react-dnd').DropTarget;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../constants/DragAndDropConstants');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroups: StormStore.getAllGroups(),
      }
    );
  },
  componentDidMount: function() {
    StormStore.addGroupListener(this.groupChange);
  },
  componentWillUnmount: function() {
    StormStore.removeGroupListener(this.groupChange);
  },

  groupChange: function() {
    this.setState({
      ideaGroups: StormStore.getAllGroups(),
    });
  },

  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
  },

  /**
   * @return {object}
   */
  render: function() {
    const connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="droppable workspace">
        {this.state.ideaGroups.map(function(group, i) {
          return <IdeaGroup
          left={group.left}
          top={group.top}
          ideas={group}
          owner={this}
          ideaID={i}/>;
        })}
      </div>
    );
  },
});

const workTarget = {
  drop: function(props, monitor) {
    const offset = monitor.getSourceClientOffset();
    const idea = monitor.getItem();

    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }

    if (monitor.getItem().type === DnDTypes.COLLECTION) {
      StormActions.moveCollection(monitor.getItem().id, Math.round(offset.x), Math.round(offset.y));
    } else {
      StormActions.ideaGroupCreate(idea, Math.round(offset.x), Math.round(offset.y));
    }
  },
};
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];

module.exports = dropTarget(dropTypes, workTarget, collectTarget)(Workspace);
