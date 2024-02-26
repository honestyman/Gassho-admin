import React from "react";
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import Nav from "./Nav";
import Header from "./Header";


const Admin=()=>{
  
  return(
    <div className="w-full text-center admin">
      <Header/>
      <div className="flex flex-row contain">
        <Nav/>
        <div className="h-full w-4/5 bg-gray-100 ">
          <Outlet />
        </div>
      </div>
        
    </div>
  );
  
};
export default Admin;