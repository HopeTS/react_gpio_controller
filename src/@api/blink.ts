import * as Types from "types";
import { fetch_with_timeout } from "@utils";

/** /blink endpoint */
const blink = async (
  connection: Types.RaspiConnection,
  pin?: number,
  duration?: number,
  interval?: number
) => {
  // Construct request
  const url = `http://${connection.ip}:${connection.port}/blink`;
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      pin,
      duration,
      interval,
    }),
  };

  // Make request
  try {
    const res = await fetch_with_timeout(url, init);
  } catch (error) {
    return false;
  }
};

export default blink;
