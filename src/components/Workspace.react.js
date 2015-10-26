const React        = require('react');
const ReactDOM = require('react-dom');

const CollectionStore   = require('../stores/CollectionStore');
const StormActions = require('../actions/StormActions');

const IdeaCollection = require('./IdeaCollection.react');
const TrashCan = require('./TrashCan.react');

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
    return ({
      ideaCollections: CollectionStore.getAllCollections(),
    });
  },
  componentDidMount: function() {
    CollectionStore.addChangeListener(this.collectionChange);
    const domNode = ReactDOM.findDOMNode(this);
    StormActions.setLayoutSize(domNode.offsetWidth, domNode.offsetHeight);
  },
  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this.collectionChange);
  },
  /** Reset state to align with StormStore */
  collectionChange: function() {
    this.setState({
      ideaCollections: CollectionStore.getAllCollections(),
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
        <div>
          {this.state.ideaCollections.map(function(group, i) {
            const left = Math.round(group.x);
            const top = Math.round(group.y);
            return <IdeaCollection
            left={left}
            top={top}
            ideas={group}
            owner={this}
            ideaID={i}/>;
          })}
        </div>
        <TrashCan />
      </div>
    );
  },
});
// REACT-DnD parameters
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];
// Workspace DropTarget options
const workTarget = {
  drop: function(props, monitor, component) {
    const pos = monitor.getClientOffset();
    const idea = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();

    // If a sub-element was dropped on, prevent bubbling
    if (hasDroppedOnChild) {
      return;
    }
    const domNode = ReactDOM.findDOMNode(component).getBoundingClientRect();
    // If the collection is being moved do not create another
    if (monitor.getItem().type === DnDTypes.COLLECTION) {
      StormActions.moveCollection(
        monitor.getItem().id,
        Math.round(pos.x) - domNode.left,
        Math.round(pos.y) - domNode.top
      );
    } else {
      StormActions.collectionCreate(
        idea,
        Math.round(pos.x) - domNode.left,
        Math.round(pos.y) - domNode.top
      );
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
