const React = require('react');
const RoomName = require('./RoomName.react.js');
const MembersList = require('./MembersList.react');
const TimerBox = require('./TimerBox.react');
const Wordbank = require('./Wordbank.react');
const IdeaBox = require('./IdeaBox.react');
const VotingSection = require('./VotingSection.react');
const StormStore = require('../stores/StormStore');

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
        <RoomName room={this.props.roomName} />
        <MembersList />
        <Wordbank data={this.props.ideas}/>
        <IdeaBox ideas={this.props.ideas} timerStatus={this.props.timerStatus} />
        <VotingSection />
        <TimerBox time={this.props.time} />
      </div>
    );
  },
});

module.exports = Sidebar;
