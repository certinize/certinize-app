import NavBar from "../components/NavBar";
import Auth from "../containers/Auth";
import CollectionCertificate from "../containers/CollectionCertificate";
import ProfilePage from "../containers/ProfilePage";
import TransferCertificate from "../containers/TransferCertificate";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const { publicKey } = useWallet();

  if (publicKey) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<CollectionCertificate />} />
          <Route path="/transfer" element={<TransferCertificate />} />
          <Route path="/certificates" element={<CollectionCertificate />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </>
    );
  }

  return <Auth />;
}

export default App;
