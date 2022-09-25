import { useState, useEffect } from "react";

import "./Controller.css";
import Board from "./Board";
import Form from "./Form";

/** Top-level GPIO component */
const Controller = () => {
  const [pinData, setPinData] = useState({});
  const [selectedPin, setSelectedPin] = useState(0);

  return (
    <div className="GPIOController">
      <Form
        pinData={pinData}
        setPinData={setPinData}
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
      />
      <Board
        pinData={pinData}
        setPinData={setPinData}
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
      />
    </div>
  );
};

export default Controller;
