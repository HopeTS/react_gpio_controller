import { PinLabel } from "types";
import "./Pin.css";

interface GPIOPinProps extends PinLabel {
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}

/** A GPIO Pin */
const Pin = ({
  number,
  name,
  type,
  color,
  selectedPin,
  setSelectedPin,
}: GPIOPinProps) => {
  const side = number % 2 === 0 ? "right" : "left";

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
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
