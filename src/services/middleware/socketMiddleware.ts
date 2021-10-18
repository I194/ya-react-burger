import { Dispatch } from "redux";
import { 
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE
} from "../actions/shop";

export const socketMiddleware = () => {
  return (store: {dispatch: Dispatch}) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch) => (action: { type: string; payload: any; wsUrl: string | URL }) => {
      const { dispatch } = store;
      const { type, payload, wsUrl } = action;
 
      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      }
      if (type === WS_CONNECTION_CLOSE) {
        socket?.close(1000, "Page with socket was closed by user");
        console.log('closed')
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData)
          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};