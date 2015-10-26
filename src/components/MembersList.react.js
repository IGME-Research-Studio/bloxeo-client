const React = require('react');
const BoardOptionsStore = require('../stores/BoardOptionsStore');

const MembersList = React.createClass({
  getInitialState: function() {
    return {
      members: BoardOptionsStore.getAllMembers(),
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    // get each idea content
    const members = this.state.members.map(function(member) {
      return (
        <div className="circleMemberIcon"><p>{member}</p></div>
      );
    });
    // put all ideas in ideaList
    return (
      <div className="membersList">
        <h5 className="sidebar-title">Team Members</h5>
        {members}
      </div>
    );
  },
});

module.exports = MembersList;
