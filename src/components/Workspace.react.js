require('jquery-ui');
require('jquery-ui/draggable');
require('jquery-ui/droppable');
const React = require('react');
const IdeaGroup = require('./IdeaGroup.react');
const $ = require('jquery');
const StormActions = require('../actions/StormActions');
const StormStore = require('../stores/StormStore');

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
    $('.droppable').droppable({
      hoverClass: '.drop-zone',
      drop: this._drop,
    });
    StormStore.addGroupListener(this.groupChange);
  },

  _drop: function(event, ui) {
    if (!$(ui.draggable).hasClass('bankCard')) {
      return;
    }

    StormActions.ideaGroupCreate();
  },

  groupChange: function() {
    this.setState({
      ideaGroups: StormStore.getAllGroups(),
    });
    console.log("ideaGroups here");
    console.log(this.state.ideaGroups);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="droppable workspace">
        {this.state.ideaGroups.map( function(group, i) {
          return <IdeaGroup
          x={group.x}
          y={group.y}
          text={group.text}
          ideas={group}
          owner={this}
          ideaID={i}/>;
        })}
      </div>
    );
  },
});

module.exports = Workspace;
