const React = require('react');
const PropTypes  = React.PropTypes;
const StormActions = require('../actions/StormActions');
const BoardOptionsStore = require('../stores/BoardOptionsStore');
const dragSource = require('react-dnd').DragSource;
const DnDTypes   = require('../constants/DragAndDropConstants');
const classNames = require('classnames');
let holdTimeout = 0;

const Idea = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    // @XXX actually the index?
    ideaID: PropTypes.number.isRequired,
    groupID: PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return { canDrag: false };
  },

  _onMouseDown: function(e) {
    e.stopPropagation();
    holdTimeout = setTimeout(() => {
      if (this.props.collectionCount > 1) {
        this.setCanDrag(true);
      }
    }, 500);
  },

  _onMouseUp: function() {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  },

  _onMouseLeave: function() {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  },

  _onMouseMove: function() {
    clearTimeout(holdTimeout);
  },

  _style: function(color) {
    return {
      width: `150px`,
      height: `75px`,
      overflow: `ellipsis`,
      boxShadow: `0 0 6px -1px rgba(0, 0, 0, 0.35)`,
      borderBottomColor: color,
    };
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
    const classToAdd = classNames('idea', 'workspaceCard',
                                  {deleting: this.state.canDrag});
    const id = this.props.ideaID;

    const color = BoardOptionsStore.getColor(this.props.userId) || '#AAA';

    const self = (
      <div
        id={id}
        className={classToAdd}
        canDrag={this.state.canDrag}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseLeave}
        onMouseMove={this._onMouseMove}
        style={this._style(color)}
      >
        {ideaString}
      </div>
    );

    if (this.state.canDrag) {
      return connectDragSource(self);
    }
    else {
      return self;
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
