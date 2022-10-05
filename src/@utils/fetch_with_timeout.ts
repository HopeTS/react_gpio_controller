import { resolve } from "dns/promises";

const fetch_with_timeout = (
  url: string,
  init: RequestInit,
  timeout = 2000
): Promise<Response> | Promise<false> => {
  // @ts-ignore
  return Promise.race([
    fetch(url, init),
    new Promise((resolve, reject) => setTimeout(() => resolve(false), timeout)),
  ]);
};

export default fetch_with_timeout;
