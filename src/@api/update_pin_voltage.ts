import * as Types from "types";

/** /update-pin-voltage endpoint */
const update_pin_voltage = async (
  connection: Types.RaspiConnection,
  pin: number,
  state: "HIGH" | "LOW"
) => {
  // Construct request
  const url = `http://${connection.ip}:${connection.port}/update-pin-voltage`;
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      pin,
      state,
    }),
  };

  // Toggle pin
  const res = await fetch(url, init);
  if (res.ok) {
    return true;
  }

  return false;
};

export default update_pin_voltage;
