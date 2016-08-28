import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import { removeCollection, destroyIdea } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';
import dndTypes from '../../constants/dndTypes';

/**
 * TrashCan component which is a dragTarget for IdeaCollections
 */
const TrashCan = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },

  /**
   * Render TrashCan component as a DragTarget
   * @return {object}
   */
  render: function() {
    const trashIcon = classNames('fa fa-trash-o trashCan');
    const connectDropTarget = this.props.connectDropTarget;
    return connectDropTarget(
      <i className={trashIcon}></i>
    );
  },
});

/**
 * DrogTarget Parameters
 */
const collectionTarget = {
  /**
   * Only collections with a single idea can be trashed
   * @param {object} props
   * @param (object) monitor
   */
  canDrop: function(props, monitor) {
    const idea = monitor.getItem();
    return (idea.ideaCount === 1);
  },
  /**
   * Remove the collection dropped onto the trash can
   * @param {object} props
   * @param (object) monitor
   */
  drop: function(props, monitor) {
    const item = monitor.getItem();

    // Remove the dropped collection
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(removeCollection(item.id));
    }
    else if (item.type === dndTypes.CARD) {
      d.dispatch(destroyIdea({ ideaContent: item.content }));
    }
  },
};

/**
 * Returns an object of the props to inject into this DragTarget component
 * @param {object} connect
 * @return {object} - objected injected into component
 */
function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}
const dropTypes = [dndTypes.COLLECTION, dndTypes.IDEA, dndTypes.CARD];

module.exports = DropTarget(
  dropTypes,
  collectionTarget,
  targetCollect
)(TrashCan);
