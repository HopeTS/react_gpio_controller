import io, { Socket } from "socket.io-client";

import * as Types from "types";

export type SocketContext = {
  /** All GPIO data */
  board: Types.PinData;

  /** Is websocket connected */
  connected: boolean;

  /** Attempt to establish websocket connection */
  connect: (connection: Types.RaspiConnection) => void;

  /** Disconnect websocket */
  disconnect: () => void;

  /** Toggle one of the pi's GPIO pins */
  togglePin: (pin: number) => boolean;

  /** Activate a pin */
  activatePin: (pin: number) => boolean;

  /** Deactivate a pin */
  deactivatePin: (pin: number) => boolean;
};
