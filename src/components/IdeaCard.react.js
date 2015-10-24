const React      = require('react');
const PropTypes  = React.PropTypes;
const dragSource = require('react-dnd').DragSource;
const DnDTypes   = require('../constants/DragAndDropConstants');

const IdeaCard = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      idea: this.props.idea,
    };
  },
  /**
   * @return {object}
   */
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
    };
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();
    const connectDragSource = this.props.connectDragSource;
    // Apply REACT-DnD to element
    return connectDragSource(
      <div className="bankCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
        {ideaString}
      </div>
    );
  },
});
// REACT-DnD
// DragSource parameters
const cardSource = {
  beginDrag: function(props) {
    return props.idea;
  },
};
function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = dragSource(DnDTypes.CARD, cardSource, dragCollect)(IdeaCard);
