import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';
import { concat, filter, none, propEq } from 'ramda';

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
const dropTypes = [dndTypes.CARD, dndTypes.IDEA, dndTypes.COLLECTION];

// DropTarget parameters
const collectionTarget = {
  // Group ideas on drop
  drop: function(props, monitor) {
    const item = monitor.getItem();

    if (item.type === dndTypes.IDEA || item.type === dndTypes.CARD) {
      if (props.collectionId === item.collectionId) {
        d.dispatch(showError(
          {'error': 'Cannot move an idea from a collection to the same collection.'}
        ));

        // Return to indicate in dropResult to prevent seperating the idea from the collection
        return {sameCollection: true};
      }
      else {
        const notInCollection = none(propEq('content', item.content))(props.ideas);

        d.dispatch(groupIdeas(
          { collectionId: props.collectionId, idea: item }
        ));

        if (!notInCollection) {
          d.dispatch(showError(
            {'error': `Idea '${item.content}' already exists in collection. Duplicate idea was discarded.`}
          ));
        }
      }
    }
    else if (item.type === dndTypes.COLLECTION) {
      const ideas = concat(props.ideas, item.ideas);

      const ideasAdded = filter((idea) => {
        const notInCollection = none(propEq('content', idea.content))(props.ideas);

        if (notInCollection) {
          d.dispatch(groupIdeas(
            { collectionId: props.collectionId, idea }
          ));
        }

        return notInCollection;
      }, ideas);


      // Remove the collection that was dropped onto the other collection
      if (item.id !== props.collectionId) {
        d.dispatch(removeCollection(
          { collectionId: item.id }
        ));

        // If there were duplicate ideas, alert the user they were discarded on collection merge
        if (ideasAdded.length < item.ideas.length) {
          d.dispatch(showError(
            {'error': `Collections merged. Duplicate ideas were discarded.`}
          ));
        }
      }
      else {
        d.dispatch(showError(
          {'error': 'Cannot merge a collection with itself.'}
        ));
      }

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
      ideas: props.ideas,
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
