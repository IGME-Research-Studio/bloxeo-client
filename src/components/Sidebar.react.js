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
        <IdeaBox timerStatus={this.props.timerStatus} />
        <section className="wordbank">
          <Wordbank data={this.props.ideas}/>
        </section>
        <VotingModal />
        <TimerBox time={this.props.time} />
      </div>
    );
  },
});

module.exports = Sidebar;
