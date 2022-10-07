import { useState, useContext } from "react";

import * as Types from "types";
import "./index.css";
import GPIO_PINS from "@data/GPIO_PINS";
import * as api from "@api";
import { SocketContext } from "@socket";

/** Form with options to update selected pin */
const Form = ({
  selectedPin,
  setSelectedPin,
}: {
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}) => {
  const [ip, setIp] = useState(process.env.DEFAULT_PI_IP || "127.0.0.1");
  const [port, setPort] = useState(5000);

  const socket = useContext(SocketContext);

  const attemptConnection = () => {
    console.log("Attempting to connect a context ws");

    socket.connect({ ip, port });
  };

  const togglePin = () => {
    socket.togglePin(selectedPin);
  };

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
            GPIO_PINS[selectedPin].type !== "Ground" &&
            socket.connected ? (
              <>
                <button onClick={(e) => togglePin()}>Toggle pin</button>
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
        <h3>{socket.connected ? "🟢" : "🔴"}Pi Connection</h3>
        <div className="GPIOForm__row">
          <label>IP address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>

        <div className="GPIOForm__row">
          <label>Port</label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
          />
        </div>

        <div className="GPIOForm__row" style={{ position: "relative" }}>
          <button onClick={(e) => attemptConnection()}>Connect</button>
          <button onClick={(e) => socket.disconnect()}>Disconnect</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
