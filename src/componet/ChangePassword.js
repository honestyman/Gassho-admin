import { useState, useEffect } from "react";
import React from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword= (props) => {
  const {id, token} = useParams()
  const [password, setpassword]=useState("");
  const [formErrors, setFormErrors]= useState("");
  const [error, setError]=useState("");
  const [isSubmit, setIsSubmit]=useState(false);

  // console.log(id, token)

  const handelChange=async (e)=>{
    e.preventDefault();
    setFormErrors(validateForm(password));
    if( validateForm(password) === "" ){
      console.log(password);
      const data={
        id:id,
        password: password
      };
      await axios.post(process.env.REACT_APP_API+"/auth/new_password", data).then((res)=>{
        // alert("パスワードは正しく変更されました。");
        console.log(res.status);
      }).catch(error=>{
        console.log(error);
      });
    }
  }

  const validateForm=(values)=>{
    let str="";
    if(!values){
      str="パスワードが必要"
      // setError("password is required");
    }else if(values.length<6){
      str="パスワードは6文字以上で入力してください！"
      // setError("This is not a valid password format!");
    }
    return str;
  }
  const changeHandler=(e)=>{
    setpassword(e.target.value);
  }

  return (
    <div className="chagepasswod pt-24">
      <p className='mb-56 text-white text-xl text-center font-bold' style={{fontFamily:"Noto Sans CJK JP"}}>パスワードの変更</p>
      <form>
        <p className='text-left ml-8 mb-2 text-white'>新しいパスワード</p>
        <input className='w-80 h-10 mx-8 rounded p-2'
              type="password"
              name="newpassword"
              id="newpassword"
              onChange={changeHandler}
              value={password}
            />
        <p className="text-white mt-2 mx-8">{formErrors}</p>
        <button className='w-80 h-12 ml-8 mt-10 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={handelChange}>送信</button>
        </form>
    </div>
  );
};
export default ChangePassword;
