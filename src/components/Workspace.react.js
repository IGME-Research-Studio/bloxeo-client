require('jquery-ui');
require('jquery-ui/draggable');
require('jquery-ui/droppable');
const React = require('react');
const IdeaGroup = require('./IdeaGroup.react');
const $ = require('jquery');
const StormActions = require('../actions/StormActions');

const Workspace = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaGroups: [],
      }
    );
  },
  componentDidMount: function() {
    $('.droppable').droppable({
      hoverClass: '.drop-zone',
      drop: this._drop,
    });
    this.state.ideaGroups = this.props.ideaGroups;

    StormActions.storeWorkspace(this);
  },
  _drop: function(event, ui) {
    if (!$(ui.draggable).hasClass('bankCard')) {
      return;
    }

    StormActions.ideaGroupCreate(this);
  },

  /**
   * @return {object}
   */
  render: function() {
    console.log("ideaGroups left on render");
    console.log(this.state.ideaGroups);
    return (
      <div className="droppable workspace">
        {this.props.groups.map( function(group, i) {
          return <IdeaGroup
          key={i}
          x={group.x}
          y={group.y}
          text={group.text}
          ideas={[group]}
          owner={this} 
          ideaID={i}/>;
        }.bind(this))}
      </div>
    );
  },
});

module.exports = Workspace;
