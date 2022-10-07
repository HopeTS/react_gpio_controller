import io from "socket.io-client";

import * as Types from "types";

/** Create websocket connection */
export const buildWebsocket = (connection: Types.RaspiConnection) => {
  const url = `ws://${connection.ip}:${connection.port}`;
  const ws = io(url, {
    autoConnect: false,
    transports: ["websocket"],
  });
  return ws;
};
