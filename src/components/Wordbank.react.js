const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const IdeaStore = require('../stores/IdeaStore');
const classNames = require('classnames');
const Wordbank = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaArray: this.props.data,
        expanded: false,
      }
    );
  },
  componentDidMount: function() {
    IdeaStore.addChangeListener(this.ideaAdd);
  },
  ideaAdd: function() {
    this.setState({
      ideaArray: IdeaStore.getAllIdeas(),
    });
  },
  /**
  * Toggle wordbank expanded on expand arrow click
  */
  _onClick: function() {
    this.setState({
      expanded: !this.state.expanded,
    });
  },
  /**
   * @return {object}
   */
  render: function() {

    const classToAdd = classNames('wordbank', {expanded: this.state.expanded});
    const arrowDirection = classNames('expandArrow', {left: this.state.expanded, right: !this.state.expanded});

    return (
      <div className={classToAdd} ref="wordbank">
      <div className='wordbankIdeas'>
        {this.props.data.map( function(item, i) {
          return <IdeaCard key={i} idea={item} owner={this} ideaID={i} />;
        })}
      </div>
      <div className='expandColumn'>
        <div className={arrowDirection} ref="expand" onClick={this._onClick}>
        </div>
      </div>
      </div>
    );
  },
});

module.exports = Wordbank;
