const React = require('react');
const BoardOptionsStore = require('../../stores/BoardOptionsStore');

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
        // member id in the store?
        <div key={member} className="circleMemberIcon"><p>{member}</p></div>
      );
    });
    // put all ideas in ideaList
    return (
      <div className="sidebar-section">
        <h5>Team Members</h5>
        {members}
      </div>
    );
  },
});

module.exports = MembersList;
