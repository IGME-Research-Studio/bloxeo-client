const React = require('react');
const StormActions = require('../actions/StormActions');
const StormStore = require('../stores/StormStore');
const Idea = require('./Idea.react');

const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      text: 'butts',
      x: 0,
      y: 0,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards

    StormStore.addGroupListener(this.ideasChange);
  },
  _style: function() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
    };
  },
  _onDrag: function() {
    StormActions.storeMovedIdea(this);
  },

  _onDrop: function() {
    StormActions.groupIdea(this);
  },

  ideasChange: function() {
    this.setState({
      ideas: StormStore.updateIdeaGroup(this.props.ideaID),
    });
  },

  render: function() {
    const groupID = this.state.ideaID;
    return (
      <div className="ideaGroup drop-zone" ref="ideaGroup">
        {this.state.ideas.content.map(function(idea, i) {
          return (
          <div className="workspaceCard draggable">
            <Idea idea={idea} ideaID={i} groupID={groupID}/>
          </div>
          );
        })}
      </div>
    );
  },
});

module.exports = IdeaGroup;
