const React = require('react');

const ModalFooter = React.createClass({
  render: function() {
    return (
      <div className="modalFooter">
        <div className="modalTerms">
          Logging in confirms your agreement to <a href="#">our EULA</a>.
        </div>
        <button
          className="modalButton"
          onClick={this.props.click}>
          {this.props.buttonText}
        </button>
      </div>
    );
  },
});

module.exports = ModalFooter;
