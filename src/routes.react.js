import React from 'react';
import { Router, Route } from 'react-router';

import RoomContainer from './containers/RoomContainer.react';
import LandingContainer from './containers/LandingContainer.react';
import CreateRoomContainer from './containers/CreateRoomContainer.react';
import JoinRoomContainer from './containers/JoinRoomContainer.react';

const renderRoutes = (history) => {
  return (
    <Router history={history}>
      <Route
        name="root"
        path="/"
        component={LandingContainer}>

        <Route
          path="room/join/:boardId"
          component={JoinRoomContainer} />
        <Route
          path="room/join"
          component={JoinRoomContainer} />
        <Route
          path="room/create"
          component={CreateRoomContainer} />
      </Route>

      <Route
        name="join-room"
        path="room"
        component={RoomContainer} />

      <Route
        name="specific-room"
        path="room/:boardId"
        component={RoomContainer} />
    </Router>
  );
};

export default renderRoutes;
