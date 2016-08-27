import io from 'socket.io-client';
import { SERVER_URL } from './constants/appConstants';

export default io.connect(SERVER_URL);
