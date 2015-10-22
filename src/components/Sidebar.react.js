const React = require('react');
const RoomInfoBox = require('./RoomInfoBox.react');
const MembersList = require('./MembersList.react');
const TimerBox = require('./TimerBox.react');
const Wordbank = require('./Wordbank.react');
const IdeaBox = require('./IdeaBox.react');
const VotingModal = require('./VotingModal.react');

const Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sideBar">
        <RoomInfoBox room={this.props.room} />
        <MembersList />
        <Wordbank data={this.props.ideas}/>
        <IdeaBox ideas={this.props.ideas} timerStatus={this.props.timerStatus} />
        <VotingModal />
        <TimerBox time={this.props.time} />
      </div>
    );
  },
});

module.exports = Sidebar;
