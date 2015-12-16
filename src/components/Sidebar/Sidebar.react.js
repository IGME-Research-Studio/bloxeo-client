const React = require('react');
const Brand = require('./Brand.react');
const RoomInfoBox = require('./RoomInfoBox.react');
const MembersList = require('./MembersList.react');
const Wordbank = require('./Wordbank.react');
const IdeaCreate = require('./IdeaCreate.react');
const VotingModal = require('../Voting/VotingModal.react');

const Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="sidebar">
        <div className="sidebar-info">
          <Brand />
          <RoomInfoBox room={this.props.room} />
          <MembersList />
          <VotingModal />
        </div>
        <Wordbank data={this.props.ideas} />
        <div>
          <IdeaCreate timerStatus={this.props.timerStatus} />
        </div>
      </div>
    );
  },
});

module.exports = Sidebar;
