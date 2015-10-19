const React        = require('react');
const PropTypes    = React.PropTypes;
// const $            = require('jquery');
// const StormActions = require('../actions/StormActions');
const dragSource   = require('react-dnd').DragSource;
const DnDTypes     = require('../constants/DragAndDropConstants');

const cardSource = {
  beginDrag: function() {
    // Return the data describing the dragged item
    return {};
  },
};

const IdeaCard = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      idea: this.props.idea,
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
  componentDidMount: function() {
    // Add ghosting functionality to bank cards on drag
  },
  /**
   * @return {object}
   */
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
    };
  },

  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();

    const connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div className="bankCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
        {ideaString}
      </div>
    );
  },
});

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

module.exports = dragSource(DnDTypes.CARD, cardSource, collect)(IdeaCard);
