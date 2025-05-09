import axios from "axios";
import React, { useState } from "react";
import { FormSVG, Lock } from "../SVG";
import Notification from "../index";
import style from "./SignUp.module.css";

const SignUp = ({setLogin,setSignup,notification,setNotification}) => {

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:" ",
  });

  const handleFieldChange = (fieldName,e)=>{
    setUser({...user,[fieldName]:e.target.value})
  }

  const createAccount = async (e)=>{
    e.preventDefault();
    if(
      user.email == " " || user.password == "" || user.name == "" || user.confirmPassword == ""
    ){
      return setNotification("please provide all the details");  
    }
    setNotification("wait Creating Account...");
    try {
      const response = await axios({
        method:"POST",
        url:"/api/v1/user/signup",
        withCredentials:true,//stores the cookie
        data:{
          name:user.name,
          email:user.email,
          password:user.password,
          passwordConfirm:user.confirmPassword
        }});
        if(response.data.status == "success"){
          setNotification("Account is Successfully created");
          localStorage.setItem("NFTApi Token",response.data.token);
          setSignup(false);
          setNotification("");
          window.location.reload();
        }else{
          setNotification("something went wrong try again later")
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className={style.card}>
      <div className={style.card2}>
        <form className={style.form}>
        <p id="heading" className={style.heading}>
          SignUp
        </p>
        <div className={style.field}>
        <FormSVG styleClass={style.input_icon}/>
        <input type="text"
        className={style.input_field}
        placeholder="name"
        autoComplete="off"
        onChange={(e) => handleFieldChange("name",e)}
        />
        </div>
        <div
        className={style.field}
        >
          <FormSVG
          styleClass={style.input_icon}
          />
          <input type="text"
          className={style.input_field}
          placeholder="email"
          autoComplete="on"
          onChange={(e) => handleFieldChange("email",e)}

          />
        </div>
        <div
        className={style.field}
        >
          <FormSVG
          styleClass={style.input_icon}
          />
          <input type="text"
          className={style.input_field}
          placeholder="password"
          autoComplete="off"
          onChange={(e) => handleFieldChange("password",e)}
          />
        </div>
        <div
        className={style.field}
        >
          <FormSVG
          styleClass={style.input_icon}
          />
          <input type="text"
          className={style.input_field}
          placeholder="confirmPassword"
          autoComplete="off"
          onChange={(e) => handleFieldChange("confirmPassword",e)}
          />
        </div>
        <div className={style.btn}>
          <button
          className={style.button1}
          onClick={()=>(setLogin(true),setSignup(false))}

          >
            &nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button
          className={style.button2}
          onClick={()=>setSignup(false)}
          >
            Close
          </button>
        </div>
        <button className={style.button3}
        onClick={(e)=> createAccount(e)}
        >SignUp</button>
        </form>
      </div>
    </div>
    </>
  )
};

export default SignUp;
