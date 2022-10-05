import { useState, useEffect } from "react";

import * as Types from "types";
import "./Form.css";
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
}: {
  pinData: Types.PinData;
  setPinData: (oldState: Types.PinData) => void;
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
  piIP: string;
  setPiIP: (oldState: string) => void;
  piPort: number;
  setPiPort: (oldState: number) => void;
}) => {
  const [formData, setFormData] = useState({});
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [shouldTestConnection, setShouldTestConnection] = useState(false);

  // Whenever ip or port changes
  useEffect(() => {
    setShouldTestConnection(true);
  }, [piIP, piPort]);

  // Retest connection whenever appropriate
  useEffect(() => {
    const test = async () => {
      const res = await api.ping({ ip: piIP, port: piPort });
      setConnectionEstablished(res);
    };

    if (shouldTestConnection) {
      test();
      setShouldTestConnection(false);
    }
  }, [shouldTestConnection]);

  /** Test connection to pi */
  const testConnection = async () => {
    console.log("Testing connection");
    const didConnect = await api.ping({ ip: piIP, port: piPort });
    setConnectionEstablished(didConnect);
    setShouldTestConnection(didConnect);
  };

  const getPinInfo = async () => {
    console.log("Getting pin info");
    const pinInfo = await api.get_pin_info({ ip: piIP, port: piPort });
    console.log("pin info", pinInfo);
  };

  const blink = async () => {
    console.log("Blinking");
    const blink = await api.blink({ ip: piIP, port: piPort });
  };

  const togglePin = async () => {
    await api.toggle_pin({ ip: piIP, port: piPort }, selectedPin);
  };

  const attemptConnection = async () => {
    setShouldTestConnection(true);
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
            GPIO_PINS[selectedPin].type !== "Ground" ? (
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
        <h3>{connectionEstablished ? "🟢" : "🔴"}Pi Connection</h3>
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
          <button onClick={(e) => getPinInfo()}>Get info</button>
        </div>

        <div className="GPIOForm__row">
          <button onClick={(e) => blink()}>Blink</button>
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
