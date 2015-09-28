const React = require('react');
<<<<<<< HEAD
const ReactPropTypes = React.PropTypes;
const ClassNames = require('classnames');
=======
>>>>>>> upstream/master
const interact = require('interact.js');

const IdeaCard = React.createClass({

<<<<<<< HEAD
  getInitialState: function () {
    return {
      x: 0,
      y: 0
=======
  getInitialState: function() {
    return {
      x: 0,
      y: 0,
>>>>>>> upstream/master
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
<<<<<<< HEAD
  componentDidMount: function () {
    // Add draggable functionality to component
    interact(this.getDOMNode()).draggable({
      onmove: this._onMove
=======
  componentDidMount: function() {
    // Add draggable functionality to component
    interact(this.getDOMNode()).draggable({
      onmove: this._onMove,
>>>>>>> upstream/master
    });
    // Add draggable functionality to component
    interact(this.getDOMNode()).dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.55,
<<<<<<< HEAD
      ondrop: this._onDrop
=======
      ondrop: this._onDrop,
>>>>>>> upstream/master
    });
  },
  /**
   * @param event: event obj
   */
<<<<<<< HEAD
  _onMove: function (event) {
    this.setState({
      x: this.state.x + event.dx,
      y: this.state.y + event.dy
=======
  _onMove: function(event) {
    this.setState({
      x: this.state.x + event.dx,
      y: this.state.y + event.dy,
>>>>>>> upstream/master
    });
  },
  /**
   * @return {object}
   */
<<<<<<< HEAD
  _style: function () {
    return {
      transform: "translate("+this.state.x+"px,"+this.state.y+"px)"
=======
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
>>>>>>> upstream/master
    };
  },
  /**
   * @param event: event obj
   */
<<<<<<< HEAD
  _onDrop: function (event) {
    let dropzoneElement = event.target;
    dropzoneElement.textContent += event.relatedTarget.textContent;
    event.relatedTarget.remove();
=======
  _onDrop: function(event) {
    const dropzoneElement = event.target;
    const newContent = [
      dropzoneElement.textContent,
      event.relatedTarget.textContent,
    ];
    const newCard = {
      content: newContent,
      keep: true,
    };
    this.props.parentIdeaMerge(newCard, this.props.ideaID);
>>>>>>> upstream/master
  },
  /**
   * @return {object}
   */
<<<<<<< HEAD
  render: function () {
    let idea = this.props.idea;
    let ideaString = idea.content.toString();
=======
  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();
>>>>>>> upstream/master

    return (
      <div className="drag1 drag draggable drag-drop dropzone" style={this._style()}>
          {ideaString}
      </div>
    );
<<<<<<< HEAD
  }
=======
  },
>>>>>>> upstream/master
});

module.exports = IdeaCard;
