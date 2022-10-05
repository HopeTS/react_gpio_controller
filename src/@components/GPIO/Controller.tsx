import { useState, useEffect } from "react";

import * as api from "@api";
import "./Controller.css";
import Board from "./Board";
import Form from "./Form";
import * as Types from "types";

/** Top-level GPIO component */
const Controller = () => {
  const [pinData, setPinData] = useState<Types.PinData>({});
  const [selectedPin, setSelectedPin] = useState(0);
  const [piIP, setPiIP] = useState("127.0.0.1");
  const [piPort, setPiPort] = useState(5000);

  // Startup
  useEffect(() => {
    //getPinData();
  }, []);

  return (
    <div className="GPIOController">
      <Form
        pinData={pinData}
        setPinData={setPinData}
        selectedPin={selectedPin}
        piIP={piIP}
        setPiIP={setPiIP}
        piPort={piPort}
        setPiPort={setPiPort}
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
