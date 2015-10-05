const React = require('react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const IdeaCard = React.createClass({

  
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      sizeTimeout: undefined, 
      attachTimeout: undefined
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
  componentDidMount: function() {
    // Add ghosting functionality to bank cards on drag
    $(".bankCard").draggable({
      opacity: 0.7, 
      helper: "clone"
    });
  },
  _drag: function(event, ui){
    //console.log("dragging");
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
  _onDrop: function(event, ui) {
    console.log("card is dropped");
  },
  /**
   * @return {object}
   */
  _over: function(event, ui) {
    console.log("hovering");

  },
  _out: function(event, ui) {
    console.log("not hovering");
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();
    
    return (
      <div className="bankCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
        {ideaString}
      </div>
    );
  },
});

module.exports = IdeaCard;
