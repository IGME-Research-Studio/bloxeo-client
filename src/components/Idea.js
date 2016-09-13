import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import { separateIdeas } from '../actionCreators';
import dndTypes from '../constants/dndTypes';
import d from '../dispatcher/AppDispatcher';
import BoardOptionsStore from '../stores/BoardOptionsStore';

let holdTimeout = 0;

const getColor = (userId) => BoardOptionsStore.getColor(userId) || '#AAA';

const Idea = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    // @XXX actually the index?
    ideaID: PropTypes.number.isRequired,
    groupID: PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      canDrag: false,
      color: getColor(this.props.userId),
    };
  },

  componentDidMount: function() {
    BoardOptionsStore.addUpdateListener(() =>
      this.setState({ color: getColor(this.props.userId) }));
  },

  _onMouseDown: function(e) {
    e.stopPropagation();
    holdTimeout = setTimeout(() => {
      this.setCanDrag(true);
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

    const self = (
      <div
        id={id}
        className={classToAdd}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseLeave}
        onMouseMove={this._onMouseMove}
        style={this._style(this.state.color)}
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
      type: dndTypes.IDEA,
      id: props.ideaID,
      ideaCount: 1,
    };
  },

  endDrag: function(props, monitor, component) {
    const dropped = monitor.didDrop();
    if (dropped) {
      d.dispatch(
        separateIdeas({
          groupId: component.props.groupID,
          content: component.props.content,
        })
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

module.exports = DragSource(dndTypes.IDEA, ideaSource, dragCollect)(Idea);
