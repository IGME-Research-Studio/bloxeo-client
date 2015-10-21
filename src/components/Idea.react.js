const React = require('react');
const $ = require('jquery');
const StormActions = require('../actions/StormActions');

const Idea = React.createClass({

  getInitialState: function() {

    return {
      idea: this.props.idea,
      ideaID: this.props.ideaID,
      groupID: this.props.groupID,
    };
  },

  componentDidMount: function() {
    const object = this;
    let holdTimeout = 0;
    /**
    * detect mouse click and hold to remove ideas from collections
    */
    $(React.
      findDOMNode(this.refs.idea)).mousedown(function() {
      holdTimeout = setTimeout(function() {
        object.onHold();
      }, 1500);
    }).bind('mouseup mouseleave', function() {
      clearTimeout(holdTimeout);
    });

    /**
    * detect mouse move to stop idea from being removed from collections
    */
    $(React.findDOMNode(this.refs.idea)).mousemove(function() {
      clearTimeout(holdTimeout);
    });
  },
  onHold: function() {
    StormActions.separateIdeas(this.state.ideaID, this.state.groupID);
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="idea" ref="idea">
        {this.props.idea}
      </div>
    );
  },
});

module.exports = Idea;
