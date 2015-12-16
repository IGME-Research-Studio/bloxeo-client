const React = require('react');
const FontAwesome = require('react-fontawesome');

const ModalHeader = React.createClass({
  render: function() {
    return (
      <div className="modalHeader">
        <div className="modalTitle">{this.props.title}</div>
        <FontAwesome
          name="times"
          className="modalClose"
          onClick={this.props.close} />
      </div>
    );
  },
});

module.exports = ModalHeader;
