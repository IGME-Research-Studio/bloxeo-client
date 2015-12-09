const React           = require('react');
const StormActions    = require('../../actions/StormActions');
const dropTarget      = require('react-dnd').DropTarget;
const PropTypes       = React.PropTypes;
const DnDTypes        = require('../../constants/DragAndDropConstants');
const classNames      = require('classnames');

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
    const trashIcon = classNames('fa fa-trash-o trashCan'); /* FIX , { 'fa-trash-o': true, 'fa-trash': drop}); */
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
    const idea = monitor.getItem();

    // Remove the dropped collection
    if (idea.type === DnDTypes.COLLECTION) {
      StormActions.removeCollection(idea.id);
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
const dropTypes = [DnDTypes.COLLECTION, DnDTypes.IDEA];

module.exports = dropTarget(
  dropTypes,
  collectionTarget,
  targetCollect
)(TrashCan);
