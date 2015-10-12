const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const IdeaGroup = require('./IdeaGroup.react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const StormActions = require('../actions/StormActions');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroups: []
      }
    );
  },
  componentDidMount: function(){
    $(".droppable").droppable({
      hoverClass: ".drop-zone",
      drop: this._drop
    });
    this.state.ideaGroups = this.props.ideaGroups;
  },
  _drop: function(event, ui) {
    if(!$(ui.draggable).hasClass("bankCard")) {
      return;
    }

    var dropX = event.clientX - $(".dragContainer").offset().left;
    var dropY = event.clientY - $(".dragContainer").offset().top;
    
    StormActions.ideaGroupCreate(this)
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="droppable workspace">
        {this.props.groups.map( function(group, i) {
          return <IdeaGroup 
          key={i} 
          x={group.x} 
          y={group.y} 
          text={group.text} 
          ideas={[group]} 
          owner={this} ideaID={i}/>
        }.bind(this))}
      </div>
    );
  },
});

module.exports = Workspace;
