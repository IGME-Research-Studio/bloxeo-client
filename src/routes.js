import React from 'react';
import { Router, Route } from 'react-router';

import RoomContainer from './containers/RoomContainer';
import LandingContainer from './containers/LandingContainer';
import CreateRoomContainer from './containers/CreateRoomContainer';
import JoinRoomContainer from './containers/JoinRoomContainer';
import NotFoundContainer from './containers/NotFoundContainer';

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
