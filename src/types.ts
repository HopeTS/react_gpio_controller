/** Labelling data for each GPIO pin */
export type PinLabel = {
  /** Pin number (1-40, based on J8 Header) */
  number: number;

  /** Pin name (Such as 3.3 VDC, GPIO 12 or Ground) */
  name: string;

  /** Pin color (For UI) */
  color: string;

  /** Pin Type (Power or SCL1) */
  type: string;
  // TODO Finish these ^
};

export type PinLabels = {
  [key: number]: PinLabel;
};

/** Connection information for pi */
export type RaspiConnection = {
  /** (Local or global) IP address of pi */
  ip: string;

  /** API port */
  port: number;
};

/** Pin data coming from Raspi */
export type Pin = {
  /** Pin name */
  name: string;

  /** Pin number */
  number: number;

  /** Pin type */
  type: string;

  /** Pin state (HIGH or LOW) */
  state: "HIGH" | "LOW";
};

/** Pin data (JSON object from pi) */
export type PinData = { [key: number]: Pin };
