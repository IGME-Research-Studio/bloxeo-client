const React = require('react');
const RoomName = require('./RoomName.react.js');
const MembersList = require('./MembersList.react');
const TimerElement = require('./TimerElement.react');
const Wordbank = require('../components/Wordbank.react');
const IdeaBox = require('./IdeaBox.react');
const StormStore = require('../stores/StormStore');
const VotingSection = require('./VotingSection.react');

const Sidebar = React.createClass({
  getInitialState: function() {
    return {
      roomName: this.props.roomName,
      ideas: StormStore.getAllIdeas(),
    };
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sideBar">
        <RoomName room={this.state.roomName} />
        <MembersList />
        <Wordbank data={this.state.ideas}/>
        <IdeaBox data={this.state.ideas} />
        <VotingSection />
        <TimerElement />
      </div>
    );
  },
});

module.exports = Sidebar;
