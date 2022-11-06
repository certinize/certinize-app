import { authSolanaUser } from "../api/UserAPI";
import NavBar from "../components/NavBar";
import AboutUs from "../containers/AboutUs";
import Auth from "../containers/Auth";
import CertificateCollection from "../containers/CertificateCollection";
import CertificateIssuance from "../containers/CertificateIssuance";
import ProfilePage from "../containers/ProfilePage";
import TemplateUpload from "../containers/TemplateUpload";
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
          <Route path="/" element={<CertificateCollection />} />
          <Route path="/issuance" element={<CertificateIssuance />} />
          <Route path="/certificate" element={<CertificateCollection />} />
          <Route path="/upload" element={<TemplateUpload />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/issuer-verification" element={<VerificationForm />} />
        </Route>
      </Routes>
    );
  }

  return <Auth />;
}

export default App;
