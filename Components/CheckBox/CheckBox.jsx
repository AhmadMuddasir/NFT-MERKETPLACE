import React from "react";
import style from "./CheckBox.module.css"

const CheckBox = ({category,setCategory}) => {
  return (
    <label
    className={style.material_checkbox}
    onClick={()=>{setCategory(category)}}
    >
      <input type="checkbox"/>
      <span className={style.checkmark}>
      {category}
      </span>
    </label>
  )
};

export default CheckBox;
