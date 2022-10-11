import { login } from "../../features/user/userSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Auth.css";

export default function Auth() {
  const user = useSelector((state) => state.user.pubkey);
  const dispatch = useDispatch();

  useEffect(() => {
    useConnection(dispatch);
  });

  const getProvider = () => {
    useConnection(dispatch, false);
  };

  return (
    <>
    <div className="auth-container">
      <div className="certinize">
        <img className="logo" src="./img/certinize-logo.png" alt="" />
        <p>Certinize</p>
      </div>
      <div className="auth">
        <div className="get-started">
          <span className="span-get">Get</span>
          <span className="span-started">Started</span>
        </div>
        <br/>
        <span className="wallet-label">Wallet Address: {user}</span>
        <div>
          <button onClick={getProvider}>Ethereum Wallet</button>
        </div>
      </div>
    </div>


    </>
  );
}

function useConnection(dispatch, onlyIfTrusted = true) {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      provider
        .connect({ onlyIfTrusted: onlyIfTrusted })
        .then(({ publicKey }) => {
          dispatch(login(publicKey.toString()));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
