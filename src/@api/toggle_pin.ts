import * as Types from "types";

/** /toggle-pin endpoint */
const toggle_pin = async (connection: Types.RaspiConnection, pin: number) => {
  // Validate
  if (pin < 1 || pin > 40) {
    return false;
  }

  // Construct request
  const url = `http://${connection.ip}:${connection.port}/toggle-pin`;
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      pin,
    }),
  };

  // Toggle pin
  const res = await fetch(url, init);
  if (!res.ok) {
    return false;
  }

  return true;
};

export default toggle_pin;
