const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const IdeaGroup = require('./IdeaGroup.react');
const $ = require('jquery');
const jqueryUI = require('jquery-ui');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroupArray: this.props.groups,
      }
    );
  },
  componentDidMount: function(){
    $(".droppable").droppable({
      hoverClass: ".drop-zone",
      drop: this._drop
    });
  },
  _drop: function(event, ui) {
    console.log(event);
    if($(ui.draggable).hasClass("bankCard")) {
      var group = {text: ui.draggable[0].innerHTML, x:event.pageX, y:event.pageY - 400};

      const data = this.props.data;
      const groups = this.props.groups;
      data.push(group);
      groups.push(group);
      this.forceUpdate();
    }
    
    /*
    const groups = this.props.data.map( function(groups) {
      return (
        <IdeaGroup>{groups.content}</IdeaGroup>
      );
    });*/
  },

  _onDrop: function(event, ui) {
    React.children.map(this.props.children, this._duplicateCard);
  },
  /**
   * @return {object}
   */
  render: function() {
    console.log(this.props);
    console.log("group: " + this.props.groups[0]);
    return (
      <div className="droppable workspace">
        {this.props.groups.map( function(group, i) {
          return <IdeaGroup key={i} x={group.x} y={group.y} text={group.text} ideas={[group]} owner={this} ideaID={i}/>
        })}
      </div>
    );
  },
});

module.exports = Workspace;
