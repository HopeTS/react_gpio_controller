import * as Types from "types";

/** /get-pin-info endpoint */
const get_pin_info = async (
  connection: Types.RaspiConnection
): Promise<Types.PinData | false> => {
  // Construct request
  const url = `http://${connection.ip}:${connection.port}/get-pin-info`;
  const init: RequestInit = {};

  // Make request
  const res = await fetch(url, init);
  if (!res.body) {
    return false;
  }

  // Convert response to json data
  const jsonBody: { body: string } = await res.json();
  const pinData: Types.PinData = JSON.parse(jsonBody.body);
  return pinData;
};

export default get_pin_info;
