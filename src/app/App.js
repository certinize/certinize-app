import "./App.css";
import React from "react";
import NavBar from "../components/NavBar";
import { Routes, Route } from "react-router-dom";
import TransferCertificate from "../containers/TransferCertificate";
import CollectionCertificate from "../containers/CollectionCertificate";
import ProfilePage from "../containers/ProfilePage";

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<CollectionCertificate />}/>
      <Route path="/transfer" element={<TransferCertificate />}/>
      <Route path="/certificates" element={<CollectionCertificate />}/>
      <Route path="/profile" element={<ProfilePage />}/>
      
    </Routes>
    

    </>
  );
}

export default App;
