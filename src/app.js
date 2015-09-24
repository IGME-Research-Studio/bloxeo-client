const React = require('react');
const IdeaCard = require('./components/IdeaCard.react');
const OrganizeBoard = require('./components/OrganizeBoard.react');

const body = document.querySelector('body');

const idea1 = {
  content: ['peter'],
  keep: true
};
const idea2 = {
  content: ['ryan'],
  keep: true
};

const generatedIdeas = [idea1, idea2];

window.onload = function () {
  React.render(
    <div>
      <OrganizeBoard ideas={generatedIdeas} />
    </div>,
    body
  );
};
