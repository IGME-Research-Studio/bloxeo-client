const React = require('react');
const StormActions = require('../actions/StormActions');
const StormStore = require('../stores/StormStore');
const Idea = require('./Idea.react');

const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      left: this.props.left,
      top: this.props.top,
      ideas: this.props.ideas,
      ideaID: this.props.ideaID,
    };
  },

  componentDidMount: function() {
    // Add draggable functionality to workspace cards

    StormStore.addGroupListener(this.ideasChange);
  },
  _onDrag: function() {
    StormActions.storeMovedIdea(this);
  },

  _onDrop: function() {
    StormActions.groupIdea(this);
  },
  _style: function() {
    return {
      top: `${this.props.top}px`,
      left: `${this.props.left}px`,
    };
  },

  ideasChange: function() {
    this.setState({
      ideas: StormStore.updateIdeaGroup(this.props.ideaID),
    });
  },

  render: function() {
    const groupID = this.state.ideaID;
    console.log(this.props);

    return (
      <div className="ideaGroup drop-zone" ref="ideaGroup" style={this._style()}>
        {this.state.ideas.content.map(function(idea) {
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
