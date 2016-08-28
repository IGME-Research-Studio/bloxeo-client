import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { DropTarget, DragSource } from 'react-dnd';

import { groupIdeas, removeCollection } from '../actionCreators';
import d from '../dispatcher/AppDispatcher';
import CollectionStor from '../stores/CollectionStore';
import dndTypes from '../constants/dndTypes';
import Idea from './Idea';

const IdeaCollection = React.createClass({
  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      left: this.props.left,
      top: this.props.top,
      height: 0,
      ideas: this.props.ideas,
      // @XXX this is actually the collection id?
      ideaID: this.props.ideaID,
    };
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this.ideasChange);
    const width = parseInt(ReactDOM.findDOMNode(this).offsetWidth, 10);
    const height = parseInt(ReactDOM.findDOMNode(this).offsetHeight, 10);
    this.setState({height: height});
    CollectionStore.setCollectionSize(this.props.ideaID, width, height);
  },

  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this.ideasChange);
  },

  _style: function() {
    const ss = this.squareSize();
    const width = (ss * 160) + 24;

    return {
      WebkitTransform: `translateX(${this.props.left - width / 2}px)
        translateY(${this.props.top - this.state.height / 2}px)`,
      transform: `translateX(${this.props.left - width / 2}px)
        translateY(${this.props.top - this.state.height / 2}px)`,
      width: `${width}px`, // width of card + collection padding
      WebkitColumnCount: `${ss}`,
      WebkitColumnGap: `10px`,
      MozColumnCount: `${ss}`,
      MozColumnGap: `10px`,
      ColumnCount: `${ss}`,
      ColumnGap: `10px`,
      height: `auto`,
    };
  },

  squareSize: function() {
    let value = 0;
    let sizeCount = 1;

    // TODO remove if empty check when empty collections are fixed
    // if (this.props.ideas.content.length > 0) {
    this.props.ideas.content.forEach(function(item) {
      if (item.text.length > 15) {
        value += 1;
      }
      else {
        value += 0.5;
      }
    });
    // }
    for (let i = Math.ceil(value); i < value * 100; i++) {
      if (Math.sqrt(i) % 1 === 0) {
        sizeCount = Math.sqrt(i);
        return (sizeCount);
      }
    }
    return 1;
  },

  ideasChange: function() {
    if (this.isMounted()) {
      this.setState({
        ideas: CollectionStore.updateCollection(this.props.ideaID),
      });
    }
  },

  render: function() {
    const connectDropTarget = this.props.connectDropTarget;
    const connectDragSource = this.props.connectDragSource;
    const groupID = this.state.ideaID;
    const count = this.state.ideas ? this.state.ideas.content.length : 0;
    const classes = classNames(
      'ideaGroup',
      'drop-zone',
      {collectionShadow: (count > 1)}
    );

    // Apply react DnD to element
    if (!this.state.ideas) {
      return connectDragSource(connectDropTarget(
        <div className={classes} style={this._style()}>
        </div>
        )
      );
    }

    return connectDragSource(connectDropTarget(
      <div className={classes} style={this._style()}>
        {this.state.ideas.content.map(function(idea, i) {
          return (
          <div key={i} className="draggable">
            <Idea
              content={idea.text}
              ideaID={i}
              groupID={groupID}
              collectionCount={count}
              userId={idea.userId}
            />
          </div>
          );
        })}
      </div>
    ));
  },
});

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

    d.dispatch(groupIdeas(props.ideaID, item));
    // Remove combined collection
    if (item.type === dndTypes.COLLECTION) {
      d.dispatch(removeCollection(item.id));
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
