const React = require('react');
const StormStore = require('../stores/StormStore');

const MembersList = React.createClass({
  getInitialState: function() {
    return {
      members: StormStore.getAllMembers(),
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
        {members}
      </div>
    );
  },
});

module.exports = MembersList;
