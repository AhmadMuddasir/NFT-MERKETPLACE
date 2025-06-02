import React, { useState } from "react";
import {FormSvg} from "../SVG/index";
import style from "./Donate.module.css";

const Donate = ({ setDonate, setSupport, donateAmount, setLoading }) => {
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum < 0.025) {
      setError("Minimum donation is 0.025 ETH");
      return;
    }

    try {
      setLoading(true);
      await donateAmount(amountNum);
      setDonate(false);
      setAmount("");
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form className={style.form} onSubmit={handleSubmit}>
          <p className={style.heading}>Support The Creator</p>
          <div className={style.field}>
            <input
              type="number"
              className={style.input_field}
              placeholder="amount (e.g., 0.025 ETH)"
              min="0.025"
              step="0.001"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              required
            />
          </div>
          {error && <div className={style.error}>{error}</div>}
          <div className={style.btn}>
            <button
              type="button"
              className={style.button1}
              onClick={() => setDonate(false)}
            >
              Close
            </button>
            <button type="submit" className={style.button3}>
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Donate;
