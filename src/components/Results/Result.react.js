const React = require('react');
const classNames = require('classnames');

/**
 * Result Component
 */
const Result = React.createClass({
  /**
   * Get initial state of results component
   * @return {object}
   */
  getInitialState: function() {
    return {
      selected: false,
    };
  },
  /**
   * Toggle selected state of result
   */
  toggleSelected: function() {
    const newSelectedState = !this.state.selected;
    this.setState({selected: newSelectedState});
    this.props.handleSelect(this.props.ideaCollection, newSelectedState);
  },
  /**
   * Render Results Component
   * @return {object}
   */
  render: function() {
    const groupClass = classNames({
      'resultGroup': true,
      'is-selected': this.state.selected,
    });

    return (
      <div className="resultContainer" onClick={this.toggleSelected}>
        <div className={groupClass}>
          {this.props.ideaCollection.content.map(function(idea) {
            return (
              <div className="resultGroupItem">
                {idea}
              </div>
            );
          })}
        </div>
        <div className="resultVotes">
          <span className="resultVotesStar">★</span>
          <span className="resultVotesNumber">
            {this.props.ideaCollection.votes}
          </span>
        </div>
      </div>
    );
  },
});

module.exports = Result;
