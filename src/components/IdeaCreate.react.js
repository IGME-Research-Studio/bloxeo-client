const React = require('react');

const IdeaCreate = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    const idea = React.findDOMNode(this.refs.idea).value;
    if (!idea) {
      return;
    }
    this.props.onIdeaSubmit({content: [idea.trim()], keep: true});
    React.findDOMNode(this.refs.idea).value = '';
  },
  render: function() {
    return (
      <form className="ideaCreate" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Create Idea" ref="idea" />
        <input type="submit" value="Create" />
      </form>
    );
  },
});

module.exports = IdeaCreate;
