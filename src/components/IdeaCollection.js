import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';
import { none, propEq } from 'ramda';

import { groupIdeas, removeCollection, showError } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';
import dndTypes from '../constants/dndTypes';
import Idea from './Idea';

const propTypes = {
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

const IdeaCollection = ({
  connectDropTarget,
  connectDragSource,
  ideas,
  collectionId,
}) => connectDragSource(connectDropTarget(
  <div className={classNames('ideaGroup', 'drop-zone', 'collectionShadow')}>
    {
      ideas.map((idea, i) => (
        <Idea
          className="draggable"
          key={i}
          content={idea.content}
          collectionId={collectionId}
          userId={idea.userId}
        />
      ))
    }
  </div>
));

IdeaCollection.propTypes = propTypes;

// REACT-DnD
const dropTypes = [dndTypes.CARD, dndTypes.IDEA];

// DropTarget parameters
const collectionTarget = {
  // Group ideas on drop
  drop: function(props, monitor) {
    const item = monitor.getItem();
    let success = false;

    const notInCollection = none(propEq('content', item.content))(props.ideas);

    if ((item.type === dndTypes.IDEA || item.type === dndTypes.CARD) && notInCollection) {
      d.dispatch(groupIdeas(
        { collectionId: props.collectionId, idea: item }
      ));
      success = true;
    }
    else {
      d.dispatch(showError(
        {'error': `Idea '${item.content}' already exists in collection`}
      ));
    }

    // Remove combined collection
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(removeCollection({ collectionId: item.id }));
    }

    return {success};
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
