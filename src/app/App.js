import { authSolanaUser } from "../api/UserAPI";
import NavBar from "../components/NavBar";
import AboutUs from "../containers/AboutUs";
import Auth from "../containers/Auth";
import CollectionCertificate from "../containers/CollectionCertificate";
import ProfilePage from "../containers/ProfilePage";
import TransferCertificate from "../containers/TransferCertificate";
import UploadCertificate from "../containers/UploadCertificate";
import VerificationView from "../containers/VerifcationView";
import VerificationForm from "../containers/VerificationForm";
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
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/verification" element={<VerificationView />} />
        <Route element={<NavBar />}>
          <Route path="/" element={<CollectionCertificate />} />
          <Route path="/issuance" element={<TransferCertificate />} />
          <Route path="/certificate" element={<CollectionCertificate />} />
          <Route path="/upload" element={<UploadCertificate />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/issuer-verification" element={<VerificationForm />} />
        </Route>
      </Routes>
    );
  }

  return <Auth />;
}

export default App;
