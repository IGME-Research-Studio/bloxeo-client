import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import FlipMove from 'react-flip-move';

import { mapWithIndex } from '../../utils/helpers';
import CollectionStore from '../../stores/CollectionStore';
import { createCollection, moveCollection } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';

import IdeaCollection from '../IdeaCollection';
import TrashCan from './TrashCan';

import dndTypes from '../../constants/dndTypes';

class Workspace extends React.Component {
  // Required property types
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    // set state to the first element of the array
    this.state = {
      ideaCollections: CollectionStore.getAllCollections(),
    };
  }

  componentDidMount() {
    CollectionStore.addChangeListener(this.collectionChange);
  }

  componentWillUnmount() {
    CollectionStore.removeChangeListener(this.collectionChange);
  }

  /** Reset state to align with StormStore */
  collectionChange = () => {
    this.setState({
      ideaCollections: CollectionStore.getAllCollections(),
    });
  };

  /**
   * @return {object}
   */
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="droppable workspace" >
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {
            mapWithIndex(({ key, ideas, votes }, i) => (
              <IdeaCollection
                key={i}
                index={i}
                collectionId={key}
                ideas={ideas}
                votes={votes}
              />), this.state.ideaCollections)
          }
        </FlipMove>
        <TrashCan />
      </div>
    );
  }
}

// REACT-DnD parameters
const dropTypes = [dndTypes.CARD, dndTypes.COLLECTION, dndTypes.IDEA];

// Workspace DropTarget options
const workTarget = {
  drop: function(props, monitor) {
    const item = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();

    // If a sub-element was dropped on, prevent bubbling
    if (hasDroppedOnChild) return;

    // If the collection is being moved do not create another
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(moveCollection(
        { collectionId: item.id }
      ));
    }
    // If CARD or IDEA create a collection
    else {
      d.dispatch(createCollection(
        { ideaContent: item.content }
      ));
    }

    return {success: true};
  },
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

export default DropTarget(dropTypes, workTarget, collectTarget)(Workspace);
