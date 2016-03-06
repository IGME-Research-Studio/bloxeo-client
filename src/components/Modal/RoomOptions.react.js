const React = require('react');
const ToggleButton = require('./ToggleButton.react');

const RoomOptions = React.createClass({
  _onClick: function() {
    // console.log('apply changes');
  },

  handleToggle: function(/* buttonStatus */) {
    // console.log('enable ' + buttonStatus);
  },

  render: function() {
    return (
      <div className="roomOptions">
        <div className="optionContent">
          <div className="optionTitle">Room Options</div>
          <div className="optionSection">
            <div className="optionText">Room Option One</div>
            <input type="text" className="optionInput" />
          </div>
          <div className="optionSection">
            <div className="optionText">
              <p>Room Option with not enough room for one line</p>
            </div>
            <input type="text" className="optionInput" />
          </div>
          <div className="optionSection">
            <div className="optionText">Room Option w/ Selector</div>
            <ToggleButton onToggle={this.handleToggle} />
          </div>
        </div>
        <div className="optionFooter">
          <button className="optionButton" onClick={this._onClick}>
            Apply changes
          </button>
        </div>
      </div>
    );
  },
});

module.exports = RoomOptions;
