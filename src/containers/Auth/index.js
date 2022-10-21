import styles from "./index.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const Auth = () => {
  return (
    <div className={styles.authBackground}>
      <div className={styles.authContainer}>
        <div className={styles.certinize}>
          <img className={styles.logo} src="./img/certinize-logo.png" alt="" />
          <span className={styles.title}>Certinize</span>
        </div>
        <div className={styles.authWalletDiagContainer}>
          <div className={styles.getStarted}>
            <span className={styles.authGetTxt}>Get</span>
            <p className={styles.authStartedTxt}>Started</p>
          </div>
          <div className={styles.downloadPhantomLink}>
            <span>
              Don&apos;t have a <i>Solana Wallet</i>?{" "}
              <a
                href="https://phantom.app/download"
                target="_blank"
                rel="noreferrer"
              >
                Download Phantom
              </a>
              !
            </span>
          </div>
          <div>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
