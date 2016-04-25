const React      = require('react');
const PropTypes  = React.PropTypes;
const dragSource = require('react-dnd').DragSource;
const DnDTypes   = require('../constants/DragAndDropConstants');

const IdeaCard = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    idea: PropTypes.shape({
      content: PropTypes.string,
      userId: PropTypes.string,
    }).isRequired,
  },

  render: function() {
    const ideaString = this.props.idea.content;
    const connectDragSource = this.props.connectDragSource;
    // Apply REACT-DnD to element
    return connectDragSource(
      <div
        className="bankCard ui-widget-content drop-zone ui-state-default"
      >
        {ideaString}
      </div>
    );
  },
});

// REACT-DnD
// DragSource parameters
const cardSource = {
  beginDrag: function(props) {
    return {
      content: props.idea.content,
      userId: props.idea.userId,
      ideaCount: 1,
    };
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = dragSource(DnDTypes.CARD, cardSource, dragCollect)(IdeaCard);
