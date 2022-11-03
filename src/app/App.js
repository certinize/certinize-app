import { authSolanaUser } from "../api/UserAPI";
import Auth from "../containers/Auth";
import CollectionCertificate from "../containers/CollectionCertificate";
import ProfilePage from "../containers/ProfilePage";
import TransferCertificate from "../containers/TransferCertificate";
import UploadCertificate from "../containers/UploadCertificate";
import VerificationView from "../containers/VerifcationView";
import AboutUs from "../containers/AboutUs";
import {
  setUser,
  setPubkey,
  setVerification,
} from "../features/user/userSlice";
import "./App.css";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { publicKey } = useWallet();
  const { user } = useSelector((state) => state.user);

  if (publicKey) {
    if (!user) {
      authSolanaUser(publicKey.toBase58()).then((user) => {
        dispatch(setUser(user.user));
        dispatch(setPubkey(publicKey.toBase58()));
        dispatch(setVerification(user.verification));
      });
    }

    return (
      <>
        <Routes>
          <Route path="/" element={<CollectionCertificate />} />
          <Route path="/transfer" element={<TransferCertificate />} />
          <Route path="/certificates" element={<CollectionCertificate />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload-certificate" element={<UploadCertificate />} />
          <Route path="/verification" element={<VerificationView />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </>
    );
  }

  return <Auth />;
}

export default App;
