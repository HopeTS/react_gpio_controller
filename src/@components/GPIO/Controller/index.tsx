import { useState, useEffect } from "react";

import * as utils from "@utils";
import "./index.css";
import Board from "../Board";
import Form from "../Form";
import * as Types from "types";

// Default settings
const defaultIP = process.env["DEFAULT_PI_IP"] || "127.0.0.1";
const defaultPort = parseInt(process.env["DEFAULT_PI_PORT"] || "5000");

/** Top-level GPIO component */
const Controller = () => {
  const [pinData, setPinData] = useState<Types.PinData>({});
  const [selectedPin, setSelectedPin] = useState(0);
  const [piIP, setPiIP] = useState(defaultIP);
  const [piPort, setPiPort] = useState(defaultPort);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (socket !== null) {
      socket.connect();
    }
  }, [socket]);

  const attemptConnection = async () => {
    console.log("connecting...");
    const ws = await utils.build_websocket({ ip: piIP, port: piPort });

    console.log("websocket built", ws);
    ws.on("connection", () => {
      console.log("ws connected les gooo");
    });

    // @ts-ignore
    window.websocket = ws;

    ws.on("*", (data?: any) => {
      console.log("New ws event!");
      console.log("ws data", data && data);
    });

    ws.on("disconnected", () => {
      console.log("ws disconnected");
    });

    ws.on("gpio-update", (data) => {
      console.log("Got GPIO update", data);
    });

    console.log("websocket after event hooks", ws);

    ws.on("get-gpio", (data: any) => {
      console.log("on get-gpio", data);
    });

    ws.emit("get-gpio", (data: any) => {
      console.log("get-gpio data", data);
    });

    ws.send("MESSAGE!");
  };

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
        attemptConnection={attemptConnection}
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
