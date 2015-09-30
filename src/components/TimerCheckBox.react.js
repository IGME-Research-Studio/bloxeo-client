const React = require('react');

const Checkbox = React.createClass({
  render: function() {
    return (
      <div className="checkbox">
      <input type="checkbox" />
      </div>
    );
  },
});

module.exports = Checkbox;
