import { useState, useEffect } from "react";

import * as Types from "types";
import "./index.css";
import GPIO_PINS from "@data/GPIO_PINS";
import * as api from "@api";

/** Form with options to update selected pin */
const Form = ({
  pinData,
  setPinData,
  selectedPin,
  setSelectedPin,
  piIP,
  setPiIP,
  piPort,
  setPiPort,
  attemptConnection,
}: {
  pinData: Types.PinData;
  setPinData: (oldState: Types.PinData) => void;
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
  piIP: string;
  setPiIP: (oldState: string) => void;
  piPort: number;
  setPiPort: (oldState: number) => void;
  attemptConnection: () => Promise<void>;
}) => {
  return (
    <div className="GPIOForm">
      {/* Header */}
      <h2>Control Panel</h2>
      {selectedPin > 0 && selectedPin <= 40 ? (
        <div className="GPIOForm__section">
          <div className="GPIOForm__currentPin">
            <h3>Current pin</h3>
            <p>
              <small>Pin name:</small> {GPIO_PINS[selectedPin].name}
            </p>
            <p>
              <small>Pin type:</small> {GPIO_PINS[selectedPin].type}
            </p>

            {GPIO_PINS[selectedPin].type !== "Power" &&
            GPIO_PINS[selectedPin].type !== "Ground" ? (
              <>
                <button onClick={(e) => console.log("No")}>Toggle pin</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Raspberry pi connection settings */}
      <div className="GPIOForm__section">
        <h3>{true ? "🟢" : "🔴"}Pi Connection</h3>
        <div className="GPIOForm__row">
          <label>IP address:</label>
          <input
            type="text"
            value={piIP}
            onChange={(e) => setPiIP(e.target.value)}
          />
        </div>

        <div className="GPIOForm__row">
          <label>Port</label>
          <input
            type="number"
            value={piPort}
            onChange={(e) => setPiPort(Number(e.target.value))}
          />
        </div>

        <div className="GPIOForm__row" style={{ position: "relative" }}>
          <button onClick={(e) => attemptConnection()}>Connect</button>
        </div>

        <div className="GPIOForm__row">
          <button
            onClick={(e) => api.test_websocket({ ip: piIP, port: piPort })}
          >
            Test websocket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
