const React = require('react');

const Idea = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="idea">
        {this.props.children}
      </div>
    );
  },
});

module.exports = Idea;
