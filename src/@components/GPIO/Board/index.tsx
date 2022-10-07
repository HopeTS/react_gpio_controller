import { useEffect, useContext } from "react";

import "./index.css";
import Pin from "../Pin";
import GPIO_PINS from "@data/GPIO_PINS";
import * as Types from "types";
import { SocketContext } from "@socket";

/** GPIO Board (holds all the pins) */
const Board = ({
  selectedPin,
  setSelectedPin,
}: {
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}) => {
  // Load context
  const socket = useContext(SocketContext);

  return (
    <div className="GPIOBoard">
      <div className="GPIOBoard__board">
        {Object.keys(GPIO_PINS).map((pin_number) => (
          <Pin
            {...GPIO_PINS[Number(pin_number)]}
            selectedPin={selectedPin}
            setSelectedPin={setSelectedPin}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
