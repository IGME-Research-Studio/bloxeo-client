import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

import CollectionStore from '../../stores/CollectionStore';
import { createCollection, moveCollection,
  setLayoutSize } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';

import IdeaCollection from '../IdeaCollection';
import TrashCan from './TrashCan';

import dndTypes from '../../constants/dndTypes';

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
    d.dispatch(setLayoutSize(domNode.offsetWidth, domNode.offsetHeight));
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
        monitor.getItem().id,
        Math.round(pos.x) - (domNode.left) - component.state.x,
        Math.round(pos.y) - (domNode.top) - component.state.y
      ));
    }
    else {
      d.dispatch(createCollection({
        ideaContent: idea.content,
        left: Math.round(pos.x) - (domNode.left) - component.state.x,
        top: Math.round(pos.y) - (domNode.top) - component.state.y,
      }));
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
