const React = require('react');
const VotingSection = require('./components/VotingSection.react');

const ideaData = [
  { idea: 'purple dinosaur', keep: true },
  { idea: 'massive kitten', keep: true },
  { idea: 'eye tattoos', keep: true },
  { idea: 'guava cake', keep: true},
];

const body = document.querySelector('body');

React.render(<VotingSection data={ideaData} />, body);
