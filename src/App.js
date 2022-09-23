import "./App.css";
import React from "react";
import TransferFile from "./pages/Transfer/Transfer";
import Navbar from "./components/NavBar/Navbar";
function App() {
  return (
    <div>
      <Navbar/>
      <TransferFile/>
    </div>
  );
}

export default App;
