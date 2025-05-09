import React, { useState } from "react";
import axios from "axios";

import { FormSVG,Lock } from "../SVG/index";
import style from "./Login.module.css";
import {Notification} from "../index";

const Login = ({setLogin,setSignUp,notification,setNotification}) => {
//api request

const [user,setUser] = useState({
  email:"",
  password:""
});

const handleFormFieldChange = (fieldName,e)=>{
  setUser({...user,[fieldName]:e.target.value});
}

const apiLogin =async (e)=>{
  e.preventDefault();
  if(user.email == "" || user.password == " "){
    return setNotification("please provide email and password");

  }try {
    const response =await axios({
      method:"POST",
      url:"/api/v1/user/login",
      withCredentials:true,
      data:{
        email:user.email,
        password:user.password
      }

    });
    if(response.data.status == "success"){
      setNotification("you have successfully login");
      localStorage.setItem("NFTApi Token",(await response).data.token);
      setLogin(false);
      setNotification("");
      window.location.reload();

    }
  } catch (error) {
    console.log(error);
  }
}

  return (
<>
<div className={style.card} >
  <div className={style.card2}>
    <form  className={style.form}>
      <p id="heading" className={style.heading}>
        Login
      </p>
      <div className={style.field}>
          <FormSVG styleClass={style.input_icon}/>
          <input 
          type="text" 
          className={style.input_field}
          placeholder="email"
          autoComplete="off"
          onChange={(e)=>handleFormFieldChange("email",e)}
          />
          
      </div>
      <div className={style.field}>
          <Lock styleClass={style.input_icon} />
          <input 
          type="text"
          className={style.input_field}
          placeholder="password"
          onChange={(e)=>handleFormFieldChange("password",e)}
          />
      </div>
      <div className={style.btn}>
        <button className={style.button1}
        onClick={()=>setLogin(false)}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
        <button
        className={style.button2}
        onClick={()=>{
          setSignUp(true);
          setLogin(false);
        }}

        >
          Sign Up
        </button>
      </div>
      <button
      className={style.button3}
      onClick={(e)=>apiLogin(e)}
      >Login</button>
    </form>
  </div>
</div>

{/* notification */}
{notification != " " && (
  <Notification
  setNotification={setNotification}
  notification = {notification}
  />
)}
</>
  );
};

export default Login;
