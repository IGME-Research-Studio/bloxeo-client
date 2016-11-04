import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import { separateIdeas } from '../actionCreators';
import dndTypes from '../constants/dndTypes';
import d from '../dispatcher/AppDispatcher';
import BoardOptionsStore from '../stores/BoardOptionsStore';

let holdTimeout = 0;

const getColor = (userId) => BoardOptionsStore.getColor(userId) || '#AAA';

class Idea extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,

    content: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  state = {
    canDrag: false,
    color: getColor(this.props.userId),
  };

  componentDidMount() {
    BoardOptionsStore.addUpdateListener(() =>
      this.setState({ color: getColor(this.props.userId) }));
  }

  _onMouseDown = (e) => {
    e.stopPropagation();
    holdTimeout = setTimeout(() => {
      this.setCanDrag(true);
    }, 500);
  };

  _onMouseUp = () => {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  };

  _onMouseLeave = () => {
    clearTimeout(holdTimeout);
    this.setCanDrag(false);
  };

  _onMouseMove = () => {
    clearTimeout(holdTimeout);
  };

  _style = (color) => {
    return {
      overflow: `ellipsis`,
      boxShadow: `0 0 6px -1px rgba(0, 0, 0, 0.35)`,
      borderBottomColor: color,
    };
  };

  /**
   * Set draggable
   * @param <Boolean> draggable
   */
  setCanDrag = (draggable) => {
    this.setState({
      canDrag: draggable,
    });
  };

  /**
   * @return {object}
   */
  render() {
    const connectDragSource = this.props.connectDragSource;
    const classToAdd = classNames('idea', 'workspaceCard',
                                  {deleting: this.state.canDrag});
    const self = (
      <div
        className={classToAdd}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        onMouseLeave={this._onMouseLeave}
        onMouseMove={this._onMouseMove}
        style={this._style(this.state.color)}
      >
        {this.props.content.toString()}
      </div>
    );

    if (this.state.canDrag) {
      return connectDragSource(self);
    }
    else {
      return self;
    }
  }
}

// REACT-DnD
// DragSource parameters
const ideaSource = {
  beginDrag: function(props) {
    return {
      type: dndTypes.IDEA,
      collectionId: props.collectionId,
      content: props.content,
      userId: props.userId,
    };
  },

  endDrag: function(props, monitor, component) {
    const dropped = monitor.didDrop();
    if (dropped) {
      d.dispatch(
        separateIdeas({
          collectionId: props.collectionId,
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

export default DragSource(dndTypes.IDEA, ideaSource, dragCollect)(Idea);
