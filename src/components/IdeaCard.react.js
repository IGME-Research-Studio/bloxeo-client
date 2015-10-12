require('jquery-ui');
require('jquery-ui/draggable');
require('jquery-ui/droppable');
const React = require('react');
const $ = require('jquery');
const StormActions = require('../actions/StormActions');

const IdeaCard = React.createClass({
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      idea: this.props.ideas,
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */

  componentDidMount: function() {
    // Add ghosting functionality to bank cards on drag
    $(React.findDOMNode(this.refs.ideaCard)).draggable({
      opacity: 0.7,
      helper: 'clone',
      drag: this._onDrag,
    });
  },
  /**
   * @return {object}
   */
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
    };
  },
  /**
   * @param event: event obj
   */
  _onDrag: function() {
    StormActions.storeGroupedIdea(this);
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();

    return (
      <div className="bankCard ui-widget-content drop-zone ui-state-default" style={this._style()} ref="ideaCard">
        {ideaString}
      </div>
    );


  },
});

module.exports = IdeaCard;
