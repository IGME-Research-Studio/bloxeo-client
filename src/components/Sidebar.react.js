const React = require('react');
const Brand = require('./Brand.react');
const RoomInfoBox = require('./RoomInfoBox.react');
const MembersList = require('./MembersList.react');
const TimerBox = require('./TimerBox.react');
const Wordbank = require('./Wordbank.react');
const IdeaCreate = require('./IdeaCreate.react');
const VotingModal = require('./VotingModal.react');

const Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="sidebar">
        <div id="sidebar-info">
          <Brand />
          <RoomInfoBox room={this.props.room} />
          <MembersList />
          <VotingModal />
        </div>
        <TimerBox time={this.props.time} timerStatus={this.props.timerStatus} timerWidth={this.props.timerWidth}/>
        <Wordbank data={this.props.ideas}/>
        <div className="sidebar-create">
          <IdeaCreate timerStatus={this.props.timerStatus} />
        </div>
      </div>
    );
  },
});

module.exports = Sidebar;
