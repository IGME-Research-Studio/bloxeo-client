const React = require('react');
const classNames = require('classnames');

class ToggleButton extends React.Component {
  state = { disable: true };

  _onClick = () => {
    this.setState({ disable: !this.state.disable });
    this.props.onToggle(this.state.disable);
  };

  render() {
    const toggleRadio = classNames('toggleRadio', {
      'toggleRadio enable': !this.state.disable,
      'toggleRadio disable': this.state.disable,
    });
    const toggleSlider = classNames('toggleSlider', {
      'toggleSlider enable': !this.state.disable,
      'toggleSlider disable': this.state.disable,
    });

    return (
      <div className="toggleButton" onClick={this._onClick}>
        <div ref="toggleRadio" className={toggleRadio}></div>
        <div ref="toggleSlider" className={toggleSlider}></div>
      </div>
    );
  }
}

module.exports = ToggleButton;
