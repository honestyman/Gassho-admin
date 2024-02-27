import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserAddOutlined, TagsOutlined, TransactionOutlined, VideoCameraAddOutlined, SoundOutlined, PayCircleOutlined,BellOutlined } from '@ant-design/icons';

const Nav=()=>{
  return(
    <div className="w-1/5 h-full text-left border shadow-md px-3 py-5">
      <div className="w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="/admin/manage" className="flex">
           <UserAddOutlined /> <p className="mx-2">ユーザー管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="subscription" className="flex">
          <TransactionOutlined/> <p className="mx-2">サブスクリプション管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="video" className="flex">
        <VideoCameraAddOutlined/> <p className="mx-2">動画管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 px-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="sound" className="flex">
          <SoundOutlined /> <p className="mx-2">音源管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 px-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="coin" className="flex">
          <PayCircleOutlined /> <p className="mx-2">投げ銭管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 px-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="tag" className="flex">
          <TagsOutlined /> <p className="mx-2">タグ管理</p>
        </Link>
      </div>
      <div className="w-full h-10 py-2 px-1 rounded float-left font-bold text-sm hover:bg-gray-300">
        <Link to="notification" className="flex">
          <BellOutlined className="mt-1" /> <p className="mx-2">最新情報</p>
        </Link>
      </div>
    
    </div>
  );
  
};
export default Nav;