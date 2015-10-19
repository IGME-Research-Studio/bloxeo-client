const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const StormStore = require('../stores/StormStore');

const Wordbank = React.createClass({
  // set state to the first element of the array
  getInitialState: function() {
    return (
      {
        ideaArray: this.props.data,
      }
    );
  },
  componentDidMount: function() {
    StormStore.addGroupListener(this.ideaAdd);
  },
  ideaAdd: function() {
    this.setState({
      ideaArray: StormStore.getAllIdeas(),
    });
  },
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        {this.props.data.map( function(item, i) {
          return <IdeaCard key={i} idea={item} owner={this} ideaID={i} />;
        })}
      </div>
    );
  },
});

module.exports = Wordbank;
