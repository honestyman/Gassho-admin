import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header=()=>{
  const navigate= useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/");
  }
  return(
    <div className="text-right h-16 py-3 border shadow-md pb-10">
      <div className="w-full flex flex-row">
        <p className="text-4xl mx-2 ml-10 font-bold">GASSHO</p>
        <div className="w-4/5"></div>
        <Button onClick={handleLogout} className="w-32">
            <p className="mb-2 font-bold">ログアウト</p>
        </Button>
      </div>
    </div>
  );
  
};
export default Header;