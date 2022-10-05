import "./Board.css";
import Pin from "./Pin";
import GPIO_PINS from "@data/GPIO_PINS";
import * as Types from "types";

/** GPIO Board (holds all the pins) */
const Board = ({
  pinData,
  setPinData,
  selectedPin,
  setSelectedPin,
}: {
  pinData: Types.PinData;
  setPinData: (oldState: Types.PinData) => void;
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}) => {
  return (
    <div className="GPIOBoard">
      <div className="GPIOBoard__board">
        {Object.keys(GPIO_PINS).map((pin_number) => (
          <Pin
            {...GPIO_PINS[Number(pin_number)]}
            selectedPin={selectedPin}
            setSelectedPin={setSelectedPin}
            pinData={pinData}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
