import { Dispatch } from "redux";

export const socketMiddleware = () => {
  return (store: {dispatch: Dispatch}) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) => (action: { type: any; payload: any; wsUrl: string | URL }) => {
      const { dispatch } = store;
      const { type, payload, wsUrl } = action;
 
      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData)
          dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
        };

        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
          dispatch({ type: 'WS_CONNECTION_START' });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};