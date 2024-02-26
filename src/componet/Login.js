import React from "react";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

const Login=()=>{
  const [name, setName]=useState("")
  const [password, setPassword]=useState("")

  const navigate= useNavigate();

  useEffect(() => {
    // Read the content of localStorage
    const token = localStorage.getItem('token');
    if(token){
      navigate("/admin/manage");
    }
  }, []);

  const handleChange=async(e)=>{
    e.preventDefault();
    if(name === 'admin' && password==='gassho'){
      const token = uuidv4();
      localStorage.setItem('token', token); 
      navigate("/admin/manage");
    }
  }
  const changeName=(e)=>{
    setName(e.target.value);
  }
  const changePassword=(e)=>{
    setPassword(e.target.value);
  }
  return(
    <div className="w-full login py-60 m-auto text-center">
      <div className="w-1/3 px-10 m-auto">
        <p className="text-5xl font-bold mb-10">
          管理者画面 <br/>
          GASSHO
        </p>
        <form>
          <div className="w-96 m-auto">
           <p className='text-xl text-gray-700 m-2 text-left'>名前 :</p>
          </div>
          <Input className='w-96 h-10 rounded p-2 mx-auto mb-4 border border-gray-400 rounded'
                type="text"
                name="name"
                id="name"
                onChange={changeName}
                value={name}
              />
          <div className="w-96 m-auto">
            <p className='text-xl text-gray-700 m-2 mr-14 text-left'>パスワード:</p>
          </div>
          <Input className='w-96 h-10rounded p-2 border border-gray-400 rounded'
                type="password"
                name="newpassword"
                id="newpassword"
                onChange={changePassword}
                value={password}
              />
          <br/>
          <Button className='w-96 h-12 mt-10 rounded-full font-bold' onClick={handleChange}>ログイン</Button>
        </form>
      </div>
    </div>
  );
  
};
export default Login;