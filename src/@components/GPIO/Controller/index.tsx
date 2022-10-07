import { useState, useEffect, useContext } from "react";

import * as utils from "@utils";
import "./index.css";
import Board from "../Board";
import Form from "../Form";
import * as Types from "types";
import { SocketContext } from "@socket";

// Default settings
const defaultIP = process.env["DEFAULT_PI_IP"] || "127.0.0.1";
const defaultPort = parseInt(process.env["DEFAULT_PI_PORT"] || "5000");

/** Top-level GPIO component */
const Controller = () => {
  const [selectedPin, setSelectedPin] = useState(0);

  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log("Websocket updated", socket);
  }, [socket.connected]);

  return (
    <div className="GPIOController">
      <Form selectedPin={selectedPin} setSelectedPin={setSelectedPin} />
      <Board selectedPin={selectedPin} setSelectedPin={setSelectedPin} />
    </div>
  );
};

export default Controller;
