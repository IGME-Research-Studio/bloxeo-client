import io from 'socket.io-client';
import { SERVER_URL } from './constants/StormConstants';

export default io.connect(SERVER_URL);
