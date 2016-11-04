import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import dndTypes from '../constants/dndTypes';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  idea: PropTypes.shape({
    content: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

const IdeaCard = ({ idea, connectDragSource }) => connectDragSource(
  <div className="bankCard ui-widget-content drop-zone ui-state-default">
    {idea.content}
  </div>
);

IdeaCard.propTypes = propTypes;

// REACT-DnD
// DragSource parameters
const cardSource = {
  beginDrag: function(props) {
    return {
      type: dndTypes.CARD,
      content: props.idea.content,
      userId: props.idea.userId,
    };
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(dndTypes.CARD, cardSource, dragCollect)(IdeaCard);
