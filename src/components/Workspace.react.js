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
    var dropX = event.clientX - $(".dragContainer").offset().left;
    var dropY = event.clientY - $(".dragContainer").offset().top;
    if($(ui.draggable).hasClass("bankCard")) {
      var group = {text: ui.draggable[0].innerHTML, x:dropX, y:dropY};

      const data = this.props.data;
      const groups = this.props.groups;
      data.push(group);
      console.log(group);
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
  onIdeaGroupDrop: function (ideas) {

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
