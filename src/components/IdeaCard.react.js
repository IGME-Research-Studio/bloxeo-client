const React = require('react');
const interact = require('interact.js');

const IdeaCard = React.createClass({

  getInitialState: function() {
    return {
      x: 0,
      y: 0,
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
  componentDidMount: function() {
    // Add draggable functionality to component
    interact(this.getDOMNode()).draggable({
      onmove: this._onMove,
    });
    // Add draggable functionality to component
    interact(this.getDOMNode()).dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.55,
      ondrop: this._onDrop,
    });
  },
  /**
   * @param event: event obj
   */
  _onMove: function(event) {
    this.setState({
      x: this.state.x + event.dx,
      y: this.state.y + event.dy,
    });
  },
  /**
   * @return {object}
   */
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
    };
  },
  /**
   * @param event: event obj
   */
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
  },
  /**
   * @return {object}
   */
  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();

    return (
      <div className="drag1 drag draggable drag-drop dropzone" style={this._style()}>
          {ideaString}
      </div>
    );
  },
});

module.exports = IdeaCard;
