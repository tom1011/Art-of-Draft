import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div>
    <p>
      This site was made to be a drafting aid to the card game Artifact by Valve. it uses techonologys such as 
      React, React-Redux, React-saga, Material-UI, and others. This site was made by David Friday during his time at Prime
      Digital Academy.
    </p>
  </div>
);

export default InfoPage;
