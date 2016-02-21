const React = require('react');
const PropTypes  = React.PropTypes;
const StormActions = require('../actions/StormActions');
const dragSource = require('react-dnd').DragSource;
const DnDTypes   = require('../constants/DragAndDropConstants');
const classNames = require('classnames');
let holdTimeout = 0;

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

  _onMouseDown: () => {
    holdTimeout = setTimeout(() => {
      if (that.props.collectionCount > 1) {
        this.setCanDrag(true);
      }
    }, 1500);
  },

  _onMouseUp: () => {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  },

  _onMouseLeave: () => {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  },

  _onMouseMove: () => {
    clearTimeout(holdTimeout);
  },

  _style: function() {
    if (this.state.content.length > 15) {
      return {
        width: `150px`,
        height: `125px`,
        overflow: `ellipsis`,
      };
    } else {
      return {
        width: `150px`,
        height: `75px`,
        overflow: `ellipsis`,
      };
    }
  },

  /**
   * Set draggable
   * @param <Boolean> draggable
   */
  setCanDrag: function(draggable) {
    if (this.isMounted()) {
      this.setState({
        canDrag: draggable,
      });
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    const ideaString = this.props.content.toString();
    const connectDragSource = this.props.connectDragSource;
    const draggableState = this.state.canDrag;
    const classToAdd = classNames('idea', {deleting: this.state.canDrag});
    const id = this.state.ideaID;

    if (draggableState) {
      return connectDragSource(
        <div className={classToAdd}
        canDrag={draggableState}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseLeave}
        onMouseMove={this._onMouseMove}
        style={this._style()}>
          {ideaString}
        </div>
      );
    } else {
      return (
        <div className={classToAdd}
        canDrag={draggableState} id={id}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseLeave}
        onMouseMove={this._onMouseMove}
        style={this._style()}>
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
      StormActions.separateIdeas(
        component.props.groupID,
        component.props.content
      );
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
