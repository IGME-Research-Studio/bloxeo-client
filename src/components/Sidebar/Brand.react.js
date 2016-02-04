const React = require('react');

const Brand = React.createClass({
  render: function() {
    return (
      <div className="sidebar-brand">
        <a href='/'>bloxeo</a>
      </div>
    );
  },
});

module.exports = Brand;
