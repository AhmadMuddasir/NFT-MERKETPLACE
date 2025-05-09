import React from "react";
import {FormSvg} from "../SVG/index";
import style from "./Donate.module.css";

const Donate = ({setDonate,setSupport,donateAmount,setLoading}) => {
  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form 
        className={style.form}
        >
          <p id="heading" className={style.heading} >Support The Creator
          </p>
          <div className={style.field}>
          {/* <FormSvg styleClass={style.input_icon}/> */}
          <input type="number" 
          className={style.input_field}
          placeholder="amount 0.025"
          autoComplete="off"
          min={0.025}
          onChange={(e)=>{
            setSupport(e.target.value)
          }}
          />
          </div>
          <div className={style.btn}>
            <button className={style.button1}
            onClick={()=>setDonate(false)}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className={style.button2}>SignUp</button>
          </div>
          <button
          className={style.button3}
          onClick={()=>(setLoading(true),donateAmount(),setDonate(false))}
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  )
};

export default Donate;
