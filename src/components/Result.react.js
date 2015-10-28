const React = require('react');

/**
 * Result Component
 */
const Result = React.createClass({
  /**
   * Render Results Component
   * @return {object}
   */
  render: function() {
    return (
      <div className="resultContainer">
        <div className="resultGroup">
          {this.props.ideaCollection.content.map(function(idea) {
            return (
              <div className="resultGroupItem">
                {idea}
              </div>
            );
          })}
        </div>
        <div className="resultVotesBadge">
          {'+' + this.props.ideaCollection.votes}
        </div>
      </div>
    );
  },
});

module.exports = Result;
