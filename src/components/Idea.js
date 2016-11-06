import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';

import { separateIdeas } from '../actionCreators';
import dndTypes from '../constants/dndTypes';
import d from '../dispatcher/AppDispatcher';
import BoardOptionsStore from '../stores/BoardOptionsStore';

const getColor = (userId) => BoardOptionsStore.getColor(userId) || '#AAA';

class Idea extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,

    content: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  state = {
    color: getColor(this.props.userId),
  };

  // XXX: having this many event listeners causes warnings in the console
  // Probably should be moved up the chain somehow.
  componentDidMount() {
    BoardOptionsStore.addUpdateListener(this.updateUserColors);
  }

  componentWillUnmount() {
    BoardOptionsStore.removeUpdateListener(this.updateUserColors);
  }

  updateUserColors = () => {
    this.setState({ color: getColor(this.props.userId) });
  }

  _style = (color) => {
    return {
      overflow: `ellipsis`,
      boxShadow: `0 0 6px -1px rgba(0, 0, 0, 0.35)`,
      borderBottomColor: color,
    };
  };

  /**
   * @return {object}
   */
  render() {
    const { connectDragSource } = this.props;
    const classToAdd = classNames('idea', 'workspaceCard');

    return connectDragSource(
      <div className={classToAdd} style={this._style(this.state.color)}>
        {this.props.content.toString()}
      </div>
    );
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
