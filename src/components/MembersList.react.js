const React = require('react');

const MembersList = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    // get each idea content
    const members = this.props.data.map(function(member) {
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
