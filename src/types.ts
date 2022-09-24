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
