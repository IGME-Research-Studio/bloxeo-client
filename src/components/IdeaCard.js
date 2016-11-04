import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import dndTypes from '../constants/dndTypes';

class IdeaCard extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    idea: PropTypes.shape({
      content: PropTypes.string,
      userId: PropTypes.string,
    }).isRequired,
  };

  render() {
    const ideaString = this.props.idea.content;
    const connectDragSource = this.props.connectDragSource;
    // Apply REACT-DnD to element
    return connectDragSource(
      <div className="bankCard ui-widget-content drop-zone ui-state-default">
        {ideaString}
      </div>
    );
  }
}

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
