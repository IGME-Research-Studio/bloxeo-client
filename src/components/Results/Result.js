const React = require('react');
const classNames = require('classnames');

/**
 * Result Component
 */
class Result extends React.Component {
  /**
   * Get initial state of results component
   * @return {object}
   */
  state = {
    selected: false,
  };

  /**
   * Toggle selected state of result
   */
  toggleSelected = () => {
    const newSelectedState = !this.state.selected;
    this.setState({selected: newSelectedState});
    this.props.handleSelect(this.props.ideaCollection, newSelectedState);
  };

  /**
   * Render Results Component
   * @return {object}
   */
  render() {
    const containerClass = classNames({
      'resultContainer': true,
      'selectable': this.props.selectable,
      'is-deselected': !this.state.selected,
    });

    const selectButtonIconClass = classNames({
      'fa': true,
      'fa-plus': !this.state.selected,
      'fa-check': this.state.selected,
      'resultPlusIcon': true,
    });

    const selectButton = (
      <div className="selectButton" onClick={this.toggleSelected}>
        <i className={selectButtonIconClass}></i>
      </div>
    );

    return (
      <div className={containerClass}>
        <div>
          <div className="resultVotes">
            <i className="fa fa-heart resultVotesHeart"></i>
            <span className="resultVotesNumber">
              {this.props.collection.votes}
            </span>
          </div>
          {this.props.selectable ? selectButton : null}
        </div>
        {this.props.collection.content.map(function(idea, i) {
          return (
            <div className="resultIdeaBlock" key={i}>
              <div className="bankCard resultIdea">
                {idea.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

module.exports = Result;
