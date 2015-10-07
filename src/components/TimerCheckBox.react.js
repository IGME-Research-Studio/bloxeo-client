const React = require('react');

const Checkbox = React.createClass({
  handleChange: function(e) {
    const checked = e.target.checked;
    this.props.pause(checked);
  },
  render: function() {
    return (
      <input className='checkbox' type="checkbox" onChange={this.handleChange} />
    );
  },
});

module.exports = Checkbox;
