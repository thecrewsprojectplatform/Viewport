import io from "socket.io-client";
import { sendMessageToClients } from "../../../store/video-room/video-room";
import { store } from "../../../store";

const socket = io('http://localhost:5000');

const configureSocket = dispatch => {
    // make sure our socket is connected to the port
    socket.on('connect', () => {
      console.log('connected');
    });

    // listening for the server's client broadcast message
    // createMessage = "CREATE_MESSAGE_AND_SEND"
    socket.on('messageResponse', data => {
        store.dispatch(sendMessageToClients(data))
    });

    return socket;
}

export default configureSocket;