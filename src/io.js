import io from 'socket.io-client';

import { SERVER_URL } from './constants/appConstants';
import API from './constants/APIConstants';
import d from './dispatcher/AppDispatcher';
import { changeRoomOptions, updatedIdeas,
  receivedCollections, endLoadAnimation,  } from './actionCreators';
import { checkSocketStatus } from './utils/checkStatus';

const { EVENT_API } = API;

const socket = io.connect(SERVER_URL);

socket.on('connect', () => {
  console.info(`Connection ${socket.id}`);
});

socket.on('disconnect', () => {
  console.info(`Disconnected`);
});

socket.on('reconnect', () => {
  console.info(`Reconnection ${socket.id}`);
});


socket.on(EVENT_API.UPDATED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(receivedCollections(
      {
        collections: _.omit(res.data, ['top', 'left', 'key']),
        reset: false,
      }
    ));
  })
  .catch((res) => {
    console.error(`${res} Updating the collections.`);
  });
});

// Idea was added or removed
socket.on(EVENT_API.UPDATED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(updatedIdeas({ ideas: res.data }));
  })
  .catch((res) => {
    console.error(`${res}. Updating the ideas.`);
  });
});

socket.on(EVENT_API.JOINED_ROOM, (data) => {
  console.log(data);

  checkSocketStatus(data)
  .then((res) => {

    d.dispatch(updatedIdeas({ ideas: res.data.ideas }));
    d.dispatch(receivedCollections({
      collections: res.data.collections, reset: false }));
    d.dispatch(changeRoomOptions({ updates: res.data.room }));

    d.dispatch(endLoadAnimation(true));
  });
});

socket.on(EVENT_API.RECEIVED_COLLECTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {

    d.dispatch(receivedCollections({
      collections: res.data,
      reset: false }));
  })
  .catch((res) => {
    console.error(`Error receiving collections: ${res}`);
  });
});

socket.on(EVENT_API.RECEIVED_IDEAS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(updatedIdeas({ ideas: res.data }));
  })
  .catch((res) => {
    console.error(`Error receiving ideas: ${res}`);
  });
});

socket.on(EVENT_API.UPDATED_BOARD, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(changeRoomOptions({ updates: res.data }));
  })
  .catch((res) => {
    console.error(`Error receiving update: ${res}`);
  });
});

socket.on(EVENT_API.RECEIVED_OPTIONS, (data) => {
  checkSocketStatus(data)
  .then((res) => {
    d.dispatch(changeRoomOptions({ updates: res.data }));
  })
  .catch((res) => {
    console.error(`Error receiving options: ${res}`);
  });
});

export default socket;
