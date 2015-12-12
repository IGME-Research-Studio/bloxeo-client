const React = require('react');
const IdeaCard = require('../IdeaCard.react');
const IdeaStore = require('../../stores/IdeaStore');
const classNames = require('classnames');

const Wordbank = React.createClass({
  calcHeight: function() {
    const bankElement = document.querySelector('.wordbank');
    const ideasElement = document.querySelector('.wordbankIdeas');
    const bankHeight = bankElement.offsetHeight;
    const ideasHeight = 'height:' + bankHeight + 'px;';
    ideasElement.setAttribute('style', ideasHeight);
  },
  // set state to the first element of the array
  getInitialState: function() {
    return {
      ideaArray: this.props.data,
      expanded: false,
      update: false,
    };
  },
  componentDidMount: function() {
    IdeaStore.addChangeListener(this.ideaAdd);
    window.addEventListener('resize', this.calcHeight);
    this.calcHeight();
  },
  componentWillUnmount: function() {
    IdeaStore.removeChangeListener(this.ideaAdd);
    window.removeEventListener('resize', this.calcHeight);
  },
  ideaAdd: function() {
    this.setState({
      ideaArray: IdeaStore.getAllIdeas(),
      update: !this.state.update,
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
    const arrowDirection = classNames(
      'expandArrow',
      {left: this.state.expanded, right: !this.state.expanded}
    );

    const arrowIconClass = classNames({
      'fa fa-chevron-right': !this.state.expanded,
      'fa fa-chevron-left': this.state.expanded,
    });

    return (
      <div className={classToAdd} ref="wordbank">
        <div className='wordbankWrap'>
          <div className='wordbankIdeas'>
            {this.props.data.map(function(item, i) {
              return <IdeaCard key={i} idea={item} owner={this} ideaID={i} />;
            })}
          </div>
        </div>
        <div className={arrowDirection} ref="expand" onClick={this._onClick}>
          <i className={arrowIconClass}></i>
        </div>
      </div>
    );
  },
});

module.exports = Wordbank;
