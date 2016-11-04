import React from 'react';
import classNames from 'classnames';

import IdeaCard from '../IdeaCard';
import IdeaStore from '../../stores/IdeaStore';

class Wordbank extends React.Component {
  // set state to the first element of the array
  state = {
    ideaArray: this.props.data,
    expanded: false,
    update: false,
  };

  calcHeight = () => {
    const bankElement = document.querySelector('.wordbank');
    const ideasElement = document.querySelector('.wordbankIdeas');
    const bankHeight = bankElement.offsetHeight;
    const ideasHeight = 'height:' + bankHeight + 'px;';
    ideasElement.setAttribute('style', ideasHeight);
  };

  componentDidMount() {
    IdeaStore.addChangeListener(this.ideaAdd);
    window.addEventListener('resize', this.calcHeight);
    this.calcHeight();
  }

  componentWillUnmount() {
    IdeaStore.removeChangeListener(this.ideaAdd);
    window.removeEventListener('resize', this.calcHeight);
  }

  ideaAdd = () => {
    this.setState({
      ideaArray: IdeaStore.getAllIdeas(),
      update: !this.state.update,
    });
  };

  /**
  * Toggle wordbank expanded on expand arrow click
  */
  _onClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  /**
   * @return {object}
   */
  render() {

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
            {this.props.data.map((item, i) => (
              <IdeaCard
                key={i}
                idea={item}
                owner={this}
                index={i}
              />
            ))}
          </div>
        </div>
        <div className={arrowDirection} ref="expand" onClick={this._onClick}>
          <i className={arrowIconClass}></i>
        </div>
      </div>
    );
  }
}

export default Wordbank;
