const React = require('react');

const VoteElement = React.createClass({
  render: function() {
  	let text = '';
  	this.props.idea.content.forEach(function(idea, i) {
  		if(i>0){
  			text += ', '
  		}
  		text += idea.text;
  	});
    return (
      <div className="idea">
        {text}
      </div>
    );
  },
});

module.exports = VoteElement;
