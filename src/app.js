const React = require('react');
const IdeaCard = require('./components/IdeaCard.react');

const body = document.querySelector('body');

const idea1 = {
  content: ['peter'],
  keep: true
};
const idea2 = {
  content: ['peter'],
  keep: true
};

window.onload = function () {
  React.render(
    <div>
      <IdeaCard idea={idea1} />
      <IdeaCard idea={idea2} />
    </div>,
    body
  );
};
