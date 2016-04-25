const React    = require('react');
const ReactDOM = require('react-dom');

const CollectionStore = require('../../stores/CollectionStore');
const StormActions    = require('../../actions/StormActions');

const IdeaCollection = require('../IdeaCollection.react');
const TrashCan       = require('./TrashCan.react');

const dropTarget   = require('react-dnd').DropTarget;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../../constants/DragAndDropConstants');
const _            = require('lodash');

const Workspace = React.createClass({

  // Required property types
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    boardId: PropTypes.string.isRequired,
  },

  // set state to the first element of the array
  getInitialState: function() {
    return ({
      ideaCollections: CollectionStore.getAllCollections(),
      x: 0,
      y: 0,
      panning: false,
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

  _onDrag: function(e) {
    if (this.state.panning === true) {
      this.setState({
        x: this.state.x + e.nativeEvent.movementX,
        y: this.state.y + e.nativeEvent.movementY,
      });
    }
  },

  _onMouseUp: function() {
    this.setState({
      panning: false,
    });
  },

  _onMouseDown: function(e) {
    if (e.nativeEvent.target.className.indexOf('workspace') > -1) {
      this.setState({
        panning: true,
      });
    }
  },

  _onMouseLeave: function() {
    this.setState({
      panning: false,
    });
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
    const that = this;
    return connectDropTarget(
      <div
        className="droppable workspace"
        draggable='true'
        onMouseMove={this._onDrag}
        onMouseUp={this._onMouseUp}
        onMouseDown={this._onMouseDown}
        onMouseLeave={this._onMouseLeave}
      >
        <div>
          {_.values(this.state.ideaCollections).map(function(group, i) {
            const left = Math.round(group.x) + (that.state.x);
            const top = Math.round(group.y) + (that.state.y);
            return <IdeaCollection
              key={i}
              left={left}
              top={top}
              ideas={group}
              owner={this}
              ideaID={group.key}
            />;
          })}
        </div>
        <TrashCan />
      </div>
    );
  },
});

// REACT-DnD parameters
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION, DnDTypes.IDEA];

// Workspace DropTarget options
const workTarget = {
  drop: function(props, monitor, component) {
    const pos = monitor.getClientOffset();
    const idea = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();

    // If a sub-element was dropped on, prevent bubbling
    if (hasDroppedOnChild) return;

    const domNode = ReactDOM.findDOMNode(component).getBoundingClientRect();
    // If the collection is being moved do not create another
    if (monitor.getItem().type === DnDTypes.COLLECTION) {
      StormActions.moveCollection(
        monitor.getItem().id,
        Math.round(pos.x) - (domNode.left) - component.state.x,
        Math.round(pos.y) - (domNode.top) - component.state.y
      );
    }
    else {
      StormActions.collectionCreate(
        idea.content,
        Math.round(pos.x) - (domNode.left) - component.state.x,
        Math.round(pos.y) - (domNode.top) - component.state.y
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
