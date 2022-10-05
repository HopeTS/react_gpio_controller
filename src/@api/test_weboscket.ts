import io from "socket.io-client";

import * as Types from "types";

const test_websocket = async (connection: Types.RaspiConnection) => {
  // Construct websocket
  const url = `http://${connection.ip}:${connection.port}`;
  console.log("Websocket url", url);
  const ws = io(url);

  ws.on("connect", () => {
    console.log("ws connected", ws.id);
  });

  /*   const ws = new WebSocket(url);

  ws.addEventListener("open", (event) => {
    console.log("Websocket connection established");
  });

  ws.addEventListener("message", (message) => {
    console.log("message event", message);
  });

  ws.addEventListener("gpio-update", (data) => {
    console.log("gpio update", data);
  });

  console.log("creating websocket", ws); */
};

export default test_websocket;
