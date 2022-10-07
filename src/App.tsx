import React from "react";

import Controller from "@components/GPIO/Controller";
import "./App.css";
import { SocketProvider } from "@socket";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Controller />
      </SocketProvider>
    </div>
  );
}

export default App;
