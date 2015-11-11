const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes  = React.PropTypes;
const StormActions = require('../actions/StormActions');
const dragSource = require('react-dnd').DragSource;
const DnDTypes   = require('../constants/DragAndDropConstants');
const classNames = require('classnames');

const Idea = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      content: this.props.content,
      ideaID: this.props.ideaID,
      groupID: this.props.groupID,
      top: this.props.top,
      left: this.props.left,
      canDrag: false,
    };
  },
  handleMouseOver: function() {
    this.state.holdTimer++;
    if (this.state.holdTimer > 5) {
      setCanDrag(true);
    }
  },
  handleMouseDown: function() {
    this.state.mouseClicked = true;
  },
  handleMouseStop: function() {
    this.state.mouseClicked = false;
    this.state.holdTimer = 0;
    this.setCanDrag(false);
  },
  componentDidMount: function() {
    const idea = this;
    const object = ReactDOM.findDOMNode(this);
    let holdTimeout = 0;
    const that = this;
    object.addEventListener('mousedown', function() {
      holdTimeout = setTimeout(function() {
        if (that.props.collectionCount > 1) {
          idea.setCanDrag(true);
        }
      }, 1500);
    });
    object.addEventListener('mouseup', function() {
      clearTimeout(holdTimeout);
      idea.setCanDrag(false);
    });
    object.addEventListener('mouseleave', function() {
      clearTimeout(holdTimeout);
      idea.setCanDrag(false);
    });
  },
  /**
    * Set draggable
    * @param <Boolean> draggable
    */
  setCanDrag: function(draggable) {
    this.setState({
      canDrag: draggable,
    });
  },

  /**
   * @return {object}
   */
  render: function() {
    const ideaString = this.props.content.toString();
    const connectDragSource = this.props.connectDragSource;
    const draggableState = this.state.canDrag;
    const classToAdd = classNames('idea', {deleting: this.state.canDrag});

    if (draggableState) {
      return connectDragSource(
        <div className={classToAdd} canDrag={draggableState}>
          {ideaString}
        </div>
      );
    } else {
      return (
        <div className={classToAdd} canDrag={draggableState}>
          {ideaString}
        </div>
      );
    }
  },
});

// REACT-DnD
// DragSource parameters
const ideaSource = {
  beginDrag: function(props) {
    return {
      content: props.content,
      type: DnDTypes.IDEA,
      id: props.ideaID,
      ideaCount: 1,
    };
  },
  endDrag: function(props, monitor, component) {
    const dropped = monitor.didDrop();

    if (dropped) {
      StormActions.separateIdeas(component.state.groupID, component.props.content);
    }
  },
};
function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = dragSource(DnDTypes.IDEA, ideaSource, dragCollect)(Idea);
