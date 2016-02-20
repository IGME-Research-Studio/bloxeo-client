const React    = require('react');
const ReactDOM = require('react-dom');

const CollectionStore = require('../../stores/CollectionStore');
const StormActions    = require('../../actions/StormActions');
const SocketStore  = require('../../stores/SocketStore');

const IdeaCollection = require('../IdeaCollection.react');
const TrashCan       = require('./TrashCan.react');

const dropTarget   = require('react-dnd').DropTarget;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../../constants/DragAndDropConstants');
const _            = require('lodash');
const UserModal    = require('./UserModal.react');
const Modal        = require('react-modal');

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
      x: 0,
      y: 0,
      panning: false,
      isOpen: false,
    });
  },

  openModal: function() {
    this.setState({ isOpen: true });
  },

  closeModal: function() {
    this.setState({ isOpen: false });
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this.collectionChange);
    const domNode = ReactDOM.findDOMNode(this);
    StormActions.setLayoutSize(domNode.offsetWidth, domNode.offsetHeight);
    SocketStore.addValidateListener(this.openModal);
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

  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this.collectionChange);
    SocketStore.removeValidateListener(this.openModal);
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
    const UserModalStyles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 5000000,
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        overflow: 'hidden',
        width: '28%',
        height: '40%',
        border: '0',
        marginRight: '-50%',
        padding: '0',
        borderRadius: '3px',
        transform: 'translate(-50%, -50%)',
      },
    };

    // Grab connectDropTarget function to wrap element with
    const connectDropTarget = this.props.connectDropTarget;
    const that = this;
    return connectDropTarget(
      <div className="droppable workspace" draggable='true'
      onMouseMove={this._onDrag}
      onMouseUp={this._onMouseUp}
      onMouseDown={this._onMouseDown}
      onMouseLeave={this._onMouseLeave}>
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
            ideaID={group.key}/>;
          })}
        </div>
        <TrashCan />
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={UserModalStyles}>
          <UserModal error={this.props.message} close={this.closeModal} />
        </Modal>
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
    } else {
      StormActions.collectionCreate(
        idea,
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
