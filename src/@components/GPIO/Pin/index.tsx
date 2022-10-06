import { useState, useEffect } from "react";

import * as utils from "@utils";
import * as Types from "types";
import "./index.css";

interface GPIOPinProps extends Types.PinLabel {
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
  pinData: Types.PinData;
}

/** A GPIO Pin */
const Pin = ({
  number,
  name,
  type,
  color,
  selectedPin,
  setSelectedPin,
  pinData,
}: GPIOPinProps) => {
  const side = number % 2 === 0 ? "right" : "left";

  const [innerColor, setInnerColor] = useState("transparent");

  useEffect(() => {
    // Decide default color (based on type)
    let pinColor = "transparent";
    switch (type) {
      case "Ground":
        break;

      case "Power":
        pinColor = "green";
        break;

      default:
        pinColor = "red";
        break;
    }

    // Pin color (based on power)
    if (!!pinData[number]) {
      if (pinData[number].state === "HIGH") {
        pinColor = "green";
      }
    }

    // Pin color (based on user focus)
    if (number === selectedPin) {
      pinColor = "lightblue";
    }

    setInnerColor(pinColor);
  }, [selectedPin, pinData]);

  const updateSelectedPin = () => {
    // Click to select, click again to unselect
    if (selectedPin === number) {
      setSelectedPin(0);
    } else {
      setSelectedPin(number);
    }
  };

  return (
    <div
      className="GPIOPin"
      data-side={side}
      data-selected={selectedPin === number}
      onClick={() => updateSelectedPin()}
    >
      <div className="GPIOPin__label">
        <h3>{name}</h3>
        <p>{number}</p>
      </div>

      <div className="GPIOPin__boardPiece" data-active={true}>
        <div className="GPIOPin__pin">
          <div style={{ backgroundColor: color }}>
            <div className="GPIOPin__pinInner">
              <div style={{ backgroundColor: innerColor }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
