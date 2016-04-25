const React           = require('react');
const ReactDOM        = require('react-dom');
const StormActions    = require('../actions/StormActions');
const CollectionStore = require('../stores/CollectionStore');
const dropTarget      = require('react-dnd').DropTarget;
const dragSource      = require('react-dnd').DragSource;
const PropTypes       = React.PropTypes;
const DnDTypes        = require('../constants/DragAndDropConstants');
const Idea            = require('./Idea.react');
const classNames      = require('classnames');

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

    const styles = {
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
    return styles;
  },

  squareSize: function() {
    let sizeCount = 1;
    let value = 0;

    // TODO remove when empty collections are fixed
    if (this.props.ideas.content.length > 0) {
      this.props.ideas.content.forEach(function(item) {
        if (item.text.length > 15) {
          value += 1;
        }
        else {
          value += 0.5;
        }
      });
    }

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
const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION, DnDTypes.IDEA];

// DropTarget parameters
const collectionTarget = {
  // Only allow drop from collections with one idea
  canDrop: function(props, monitor) {
    const idea = monitor.getItem();
    return (idea.ideaCount === 1);
  },
  // Group ideas on drop
  drop: function(props, monitor) {
    const idea = monitor.getItem();
    // Do not execute drop on self
    if (props.ideaID === idea.id && idea.type !== 'IDEA') {
      return;
    }
    StormActions.groupIdea(props.ideaID, idea);
    // Remove combined collection
    if (idea.type === DnDTypes.COLLECTION) {
      StormActions.removeCollection(idea.id);
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
      type: DnDTypes.COLLECTION,
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

module.exports = dragSource(DnDTypes.COLLECTION, collectionSource, dragCollect)(
  dropTarget(dropTypes, collectionTarget, targetCollect)(IdeaCollection)
);
