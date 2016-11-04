import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';
import FlipMove from 'react-flip-move';

import { groupIdeas, removeCollection } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';
import dndTypes from '../constants/dndTypes';
import Idea from './Idea';

class IdeaCollection extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,

    index: PropTypes.number.isRequired,
    collectionId: PropTypes.string.isRequired,
    ideas: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
      })
    ).isRequired,
    votes: PropTypes.number,
  };

  render() {
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;

    const classes = classNames(
      'ideaGroup',
      'drop-zone',
      'collectionShadow',
    );

    return connectDragSource(connectDropTarget(
    <div className={classes}>
      <FlipMove enterAnimation="fade" leaveAnimation="fade">
        {this.props.ideas.map((idea, i) => (
          <Idea
            className="draggable"
            key={i}
            content={idea.content}
            collectionId={this.props.collectionId}
            userId={idea.userId}
          />
        ))}
      </FlipMove>
    </div>
    ));
  }
}

// REACT-DnD
const dropTypes = [dndTypes.CARD, dndTypes.IDEA];

// DropTarget parameters
const collectionTarget = {
  // Group ideas on drop
  drop: function(props, monitor) {
    const item = monitor.getItem();

    d.dispatch(groupIdeas(
      { collectionId: props.collectionId, idea: item }
    ));

    // Remove combined collection
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(removeCollection({ collectionId: item.id }));
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
      content: props.ideas[0].content,
      type: dndTypes.COLLECTION,
      id: props.collectionId,
    };
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(dndTypes.COLLECTION, collectionSource, dragCollect)(
  DropTarget(dropTypes, collectionTarget, targetCollect)(IdeaCollection)
);
