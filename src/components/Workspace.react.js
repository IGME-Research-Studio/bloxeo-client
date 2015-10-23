const React        = require('react');

const CollectionStore   = require('../stores/CollectionStore');

const IdeaGroup    = require('./IdeaGroup.react');
const StormActions = require('../actions/StormActions');
const dropTarget   = require('react-dnd').DropTarget;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../constants/DragAndDropConstants');

const Workspace = React.createClass({
  // Required property types
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
  },
  // set state to the first element of the array
  getInitialState: function() {
    return (
      { ideaGroups: CollectionStore.getAllCollections() }
    );
  },
  componentDidMount: function() {
    CollectionStore.addChangeListener(this.groupChange);
  },
  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this.groupChange);
  },
  /** Reset state to align with StormStore */
  groupChange: function() {
    this.setState({
      ideaGroups: CollectionStore.getAllCollections(),
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    // Grab connectDropTarget function to wrap element with
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
// REACT-DnD parameters
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];
// Workspace DropTarget options
const workTarget = {
  drop: function(props, monitor) {
    const pos = monitor.getSourceClientOffset();
    console.log('monitor.getItem');
    console.log(monitor.getItem());
    const idea = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();
    // If a sub-element was dropped on, prevent bubbling
    if (hasDroppedOnChild) {
      return;
    }
    // If the collection is being moved do not create another
    if (monitor.getItem().type === DnDTypes.COLLECTION) {
      StormActions.moveCollection(
        monitor.getItem().id,
        Math.round(pos.x),
        Math.round(pos.y));
    } else {
      StormActions.collectionCreate(idea, Math.round(pos.x), Math.round(pos.y));
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

module.exports = dropTarget(dropTypes, workTarget, collectTarget)(Workspace);
