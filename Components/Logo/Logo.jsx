// DiamondLoader.jsx
import React from "react";
import styles from "./DiamondLoader.module.css";

const DiamondLoader = () => {
  return (
    <>
    
    <div className={styles.container}>
      <div className={styles.ethDiamond}>
        <div className={styles.ethDiamondFace}></div>
        <div className={styles.ethDiamondFace}></div>
        <div className={styles.ethDiamondFace}></div>
        <div className={styles.ethDiamondFace}></div>
      </div>
      
    </div>
    </>
  );
};

export default DiamondLoader;