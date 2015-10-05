const React = require('react');
const IdeaGroup = React.createClass({

  getInitialState: function() {
    return {
      text: "butts",
      x: 0,
      y: 0
    };
  },
  render: function() {
    const groupString = this.text;
    return (
      <div className="bankCard ui-widget-content">
          {groupString}
      </div>
    );
  },
});

module.exports = IdeaGroup;
