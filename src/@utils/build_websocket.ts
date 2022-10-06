import io from "socket.io-client";

import * as Types from "types";

/** Create websocket connection */
const build_websocket = async (connection: Types.RaspiConnection) => {
  const url = `ws://${connection.ip}:${connection.port}`;
  const ws = io(url);
  return ws;
};

export default build_websocket;
