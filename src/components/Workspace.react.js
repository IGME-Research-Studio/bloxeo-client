const React        = require('react');
const IdeaGroup    = require('./IdeaGroup.react');
const StormActions = require('../actions/StormActions');
const StormStore   = require('../stores/StormStore');
const dropTarget   = require('react-dnd').DropTarget;
const PropTypes    = React.PropTypes;
const DnDTypes     = require('../constants/DragAndDropConstants');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroups: StormStore.getAllGroups(),
      }
    );
  },
  componentDidMount: function() {
    StormStore.addGroupListener(this.groupChange);
  },

  groupChange: function() {
    this.setState({
      ideaGroups: StormStore.getAllGroups(),
    });
  },

  propTypes: {
    connectDropTarget: PropTypes.func.isRequired,
  },

  /**
   * @return {object}
   */
  render: function() {

    const connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="droppable workspace">
        {this.state.ideaGroups.map(function(group, i) {
          return <IdeaGroup
          left={group.left}
          top={group.top}
          text={group.text}
          ideas={group}
          owner={this}
          ideaID={i}/>;
        })}
      </div>
    );
  },
});

const workTarget = {
  // canDrop: function(props, monitor) {
  //   console.log('p');
  //   // You can disallow drop based on props or item
  //   const item = monitor.getItem();
  //   return (item.type === 'CARD' || item.type === 'COLLECTION');
  // },
  drop: function(props, monitor) {
    const offset = monitor.getSourceClientOffset();
    const idea = monitor.getItem();
    console.log(idea);
    StormActions.ideaGroupCreate(idea, Math.round(offset.x), Math.round(offset.y));
  },
};
function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const dropTypes = [DnDTypes.CARD, DnDTypes.COLLECTION];

module.exports = dropTarget(dropTypes, workTarget, collectTarget)(Workspace);
