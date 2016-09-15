import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';

import { groupIdeas, removeCollection } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';
import CollectionStore from '../stores/CollectionStore';
import dndTypes from '../constants/dndTypes';
import Idea from './Idea';

class IdeaCollection extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  state = {
    ideas: this.props.ideas,
    // @XXX this is actually the collection id?
    ideaID: this.props.ideaID,
  };

  componentDidMount() {
    CollectionStore.addChangeListener(this.ideasChange);
  }

  componentWillUnmount() {
    CollectionStore.removeChangeListener(this.ideasChange);
  }

  ideasChange = () => {
    this.setState({
      ideas: CollectionStore.updateCollection(this.props.ideaID),
    });
  };

  render() {
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;
    const groupID = this.state.ideaID;
    const count = this.state.ideas ? this.state.ideas.content.length : 0;
    const classes = classNames(
      'ideaGroup',
      'drop-zone',
      'collectionShadow',
    );

    if (!this.state.ideas) {
      return connectDragSource(connectDropTarget(
        <div className={classes}>
        </div>
        )
      );
    }

    return connectDragSource(connectDropTarget(
      <div className={classes}>
        {this.state.ideas.content.map((idea, i) => (
          <div key={i} className="draggable">
            <Idea
              content={idea.text}
              ideaID={i}
              groupID={groupID}
              collectionCount={count}
              userId={idea.userId}
            />
          </div>))
        }
      </div>
    ));
  }
}

// REACT-DnD
const dropTypes = [dndTypes.CARD, dndTypes.COLLECTION, dndTypes.IDEA];

// DropTarget parameters
const collectionTarget = {
  // Only allow drop from collections with one idea
  canDrop: function(props, monitor) {
    const idea = monitor.getItem();
    return (idea.ideaCount === 1);
  },

  // Group ideas on drop
  drop: function(props, monitor) {
    const item = monitor.getItem();

    // Do not execute drop on self
    if (props.ideaID === item.id && item.type !== 'IDEA') {
      return;
    }

    d.dispatch(groupIdeas({ ideaId: props.ideaID, idea: item }));
    // Remove combined collection
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(removeCollection({ collectionId: item.id }));
    }
  },
};

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

// DragSource parameters
const collectionSource = {
  beginDrag: function(props) {
    // Return the data describing the dragged item
    return {
      content: props.ideas.content[0].text,
      type: dndTypes.COLLECTION,
      id: props.ideaID,
      ideaCount: props.ideas.content.length,
    };
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = DragSource(dndTypes.COLLECTION, collectionSource, dragCollect)(
  DropTarget(dropTypes, collectionTarget, targetCollect)(IdeaCollection)
);
