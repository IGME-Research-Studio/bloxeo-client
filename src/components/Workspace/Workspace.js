import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import { values } from 'ramda';

import { mapWithIndex } from '../../utils/helpers';
import CollectionStore from '../../stores/CollectionStore';
import { createCollection, moveCollection,
  setLayoutSize } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';

import IdeaCollection from '../IdeaCollection';
import TrashCan from './TrashCan';

import dndTypes from '../../constants/dndTypes';

class Workspace extends React.Component {
  // Required property types
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
  };

  // set state to the first element of the array
  state = {
    ideaCollections: CollectionStore.getAllCollections(),
    x: 0,
    y: 0,
    panning: false,
  };

  componentDidMount() {
    CollectionStore.addChangeListener(this.collectionChange);
    const domNode = ReactDOM.findDOMNode(this);
    d.dispatch(setLayoutSize({
      width: domNode.offsetWidth,
      height: domNode.offsetHeight }));
  }

  componentWillUnmount() {
    CollectionStore.removeChangeListener(this.collectionChange);
  }

  _onDrag = (e) => {
    if (this.state.panning === true) {
      this.setState({
        x: this.state.x + e.nativeEvent.movementX,
        y: this.state.y + e.nativeEvent.movementY,
      });
    }
  };

  _onMouseUp = () => {
    this.setState({
      panning: false,
    });
  };

  _onMouseDown = (e) => {
    if (e.nativeEvent.target.className.indexOf('workspace') > -1) {
      this.setState({
        panning: true,
      });
    }
  };

  _onMouseLeave = () => {
    this.setState({
      panning: false,
    });
  };

  /** Reset state to align with StormStore */
  collectionChange = () => {
    this.setState({
      ideaCollections: CollectionStore.getAllCollections(),
    });
  };

  /**
   * @return {object}
   */
  render() {

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
          {
            mapWithIndex((group, i) => (
              <IdeaCollection
                key={i}
                ideas={group}
                owner={this}
                ideaID={group.key}
              />
            ),
            values(this.state.ideaCollections))
          }
        </div>
        <TrashCan />
      </div>
    );
  }
}

// REACT-DnD parameters
const dropTypes = [dndTypes.CARD, dndTypes.COLLECTION, dndTypes.IDEA];

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
    if (monitor.getItem().type === dndTypes.COLLECTION) {
      d.dispatch(moveCollection(
        {
          collectionId: monitor.getItem().id,
          left: Math.round(pos.x) - (domNode.left) - component.state.x,
          top: Math.round(pos.y) - (domNode.top) - component.state.y
        }
      ));
    }
    else {
      d.dispatch(createCollection(
        {
          ideaContent: idea.content,
          left: Math.round(pos.x) - (domNode.left) - component.state.x,
          top: Math.round(pos.y) - (domNode.top) - component.state.y,
        }
      ));
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

module.exports = DropTarget(dropTypes, workTarget, collectTarget)(Workspace);
