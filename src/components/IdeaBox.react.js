const React = require('react');
const IdeaList = require('./IdeaList.react');
const IdeaCreate = require('./IdeaCreate.react');

const IdeaBox = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
    };
  },
  handleCommentSubmit: function(idea) {
    const data = this.state.data;
    data.push(idea);
    this.props.sendParentData(data);
    this.setState({
      data: data,
    });
    this.forceUpdate();
  },

  render: function() {
    return (
      <div>
        <div id="left">
          <IdeaList data={this.state.data}/>
        </div>
        <div id="right">
          <IdeaCreate onIdeaSubmit={this.handleCommentSubmit} />
        </div>
      </div>
    );
  },
});

module.exports = IdeaBox;
