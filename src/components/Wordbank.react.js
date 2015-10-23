const React = require('react');
const IdeaCard = require('../components/IdeaCard.react');
const IdeaStore = require('../stores/IdeaStore');

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
    IdeaStore.addChangeListener(this.ideaAdd);
  },
  ideaAdd: function() {
    this.setState({
      ideaArray: IdeaStore.getAllIdeas(),
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
