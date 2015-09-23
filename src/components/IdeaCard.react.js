const React = require('react');
const ReactPropTypes = React.PropTypes;
const ClassNames = require('classnames');
const interact = require('interact.js');

const IdeaCard = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0
    };
  },
  componentDidMount: function () {
    interact(this.getDOMNode()).draggable({
      onmove: this._onMove
    });

    interact(this.getDOMNode()).dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.55,
      ondrop: this._onDrop
    });
  },

  _onMove: function (event) {
    this.setState({
      x: this.state.x + event.dx,
      y: this.state.y + event.dy
    });
  },

  _style: function () {
    return {
      transform: "translate("+this.state.x+"px,"+this.state.y+"px)"
    };
  },

  _onDrop: function (event) {
    let dropzoneElement = event.target;
    dropzoneElement.textContent += event.relatedTarget.textContent;
    event.relatedTarget.remove();
  },

  render: function () {
    let idea = this.props.idea;
    let ideaString = idea.content.toString();
    
    return (
      <div className="drag1 drag draggable drag-drop dropzone" style={this._style()}>
          {ideaString}
      </div>
    );
  }
});

module.exports = IdeaCard;
