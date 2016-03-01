import React from 'react';
import { Router, Route } from 'react-router';

import RoomContainer from './containers/RoomContainer.react';
import LandingContainer from './containers/LandingContainer.react';
import CreateRoomContainer from './containers/CreateRoomContainer.react';
import JoinRoomContainer from './containers/JoinRoomContainer.react';
import NotFoundContainer from './containers/NotFoundContainer.react';

const renderRoutes = (history) => {
  return (
    <Router history={history}>
      <Route
        path="/"
        component={LandingContainer}>

        <Route
          path="join/:boardId"
          component={JoinRoomContainer} />
        <Route
          path="join"
          component={JoinRoomContainer} />
        <Route
          path="create"
          component={CreateRoomContainer} />
      </Route>

      <Route
        path="/room/:boardId"
        component={RoomContainer} />

      <Route
        path="*"
        component={NotFoundContainer} />
    </Router>
  );
};

export default renderRoutes;
