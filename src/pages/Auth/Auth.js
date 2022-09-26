import { login } from "../../features/user/userSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
      <span>Wallet Address: {user}</span>
      <div>
        <button onClick={getProvider}>Ethereum Wallet</button>
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
