import "./Board.css";
import Pin from "./Pin";
import GPIO_PINS from "@data/GPIO_PINS";

/** GPIO Board (holds all the pins) */
const Board = ({
  pinData,
  setPinData,
  selectedPin,
  setSelectedPin,
}: {
  pinData: Object;
  setPinData: (oldState: Object) => void;
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}) => {
  return (
    <div className="GPIOBoard">
      {Object.keys(GPIO_PINS).map((pin_number) => (
        <Pin
          {...GPIO_PINS[Number(pin_number)]}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
        />
      ))}
    </div>
  );
};

export default Board;
