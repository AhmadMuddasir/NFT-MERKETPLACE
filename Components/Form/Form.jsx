import React from "react";
import {FormSVG,Lock} from "../SVG/index";
import style from "./Form.module.css";
import {CheckBox} from "../index";

const Form = ({
  setFile,
  setDisplay,
  handleFormFieldChange,
  handleSubmit,
  setCategory,
}) => {
  const categories = ["Nature","Artificial","Animal"];

  return (
    <div className={style.card}>
      <div className={style.card2}>
        <form
        className={style.forms}
        >
          <p id="heading" className={style.heading}>
            Upload Image Details
          </p>
          <div
          className={style.field}
          >
            <FormSVG styleClass={style.input_icon}/>

            <input type="text"  className={style.input_field}
            placeholder="title"
            autoComplete="off"
            onChange={(e)=> handleFormFieldChange("title",e)}
            />
          </div>
          <div
          className={style.field}
          >
            <Lock styleClass={style.input_icon}/>
            <textarea type="description"  
            className={`${style.input_field} ${style.input_field}`}
            placeholder="description"
            onChange={(e)=> handleFormFieldChange("description",e)}
            
            ></textarea>
          </div>
          <div className={style.field}>
          <FormSVG styleClass={style.input_icon}/>
          <input type="email"  className={style.input_field}
            placeholder="email"
            onChange={(e)=> handleFormFieldChange("email",e)}
            />
          </div>
          <p className={style.second}>Category</p>
          <div className={style.category}>
            {categories.map((category,i)=>(
              <CheckBox
              setCategory={setCategory}
              key={i+1}
              category={category}/>
            ))}
          </div>
          <div className={style.btn}>
            <button
            className={style.button}
            onClick={()=>{setFile(null),setDisplay(null)}}

            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className={style.button2}>SignUp</button>
          </div>
          <button onClick={(e)=>handleSubmit(e)} className={style.button3}>
            Create
          </button>
        </form>
      </div>
    </div>
  )
};

export default Form;
