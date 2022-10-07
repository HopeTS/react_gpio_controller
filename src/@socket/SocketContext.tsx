import { createContext } from "react";

import * as Types from "types";
import * as STypes from "@socket/types";

/** Context object for raspberry pi websocket interface */
export const SocketContext = createContext<STypes.SocketContext>({
  board: {},
  connected: false,
  disconnect: () => {},
  connect: (connection: Types.RaspiConnection) => {},
  togglePin: (pin: number) => false,
  activatePin: (pin: number) => false,
  deactivatePin: (pin: number) => false,
});
