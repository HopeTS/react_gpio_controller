import * as Types from "types";
import { fetch_with_timeout } from "@utils";

/** Ping the raspberry pi to check connection status */
const ping = async (connection: Types.RaspiConnection) => {
  // Construct request
  const url = `http://${connection.ip}:${connection.port}/ping`;
  const init: RequestInit = {};

  try {
    const response = await fetch_with_timeout(url, init, 4000);
    console.log("ping response", response);

    if (!response) {
      throw new Error("Something went wrong");
    }

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default ping;
