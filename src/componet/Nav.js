import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import { UserAddOutlined, TagsOutlined, TransactionOutlined, VideoCameraAddOutlined, SoundOutlined, PayCircleOutlined,BellOutlined } from '@ant-design/icons';

const Nav=()=>{
  const [change, setChange] = useState("");
  const [style, setStyle] = useState("");
  
  useEffect(() => {
    // var url = window.location.href;
    var pathname = window.location.pathname;
    setStyle(pathname);
    console.log(pathname);
  }, [change]);
  return(
    <div className="w-1/5 h-full text-left border shadow-md px-3 py-5">
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage"?'bg-gray-300':'none'}`}>
        <Link to="/manage" className="flex" onClick={()=>{setChange("manage")}}>
           <UserAddOutlined /> <p className="mx-2">ユーザー管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/subscription"?'bg-gray-300':'none'}`}>
        <Link to="subscription" className="flex" onClick={()=>{setChange("subscript")}}>
          <TransactionOutlined/> <p className="mx-2">サブスクリプション管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/video"?'bg-gray-300':'none'}`}>
        <Link to="video" className="flex" onClick={()=>{setChange("video")}}>
        <VideoCameraAddOutlined/> <p className="mx-2">動画管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/sound"?'bg-gray-300':'none'}`}>
        <Link to="sound" className="flex" onClick={()=>{setChange("sound")}}>
          <SoundOutlined /> <p className="mx-2">音源管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/coin"?'bg-gray-300':'none'}`}>
        <Link to="coin" className="flex" onClick={()=>{setChange("coin")}}>
          <PayCircleOutlined /> <p className="mx-2">投げ銭管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/tag"?'bg-gray-300':'none'}`}>
        <Link to="tag" className="flex" onClick={()=>{setChange("tag")}}>
          <TagsOutlined /> <p className="mx-2">タグ管理</p>
        </Link>
      </div>
      <div className={`w-full h-10 py-2 pl-1 rounded float-left font-bold text-sm hover:bg-gray-300 ${style==="/manage/notification"?'bg-gray-300':'none'}`}>
        <Link to="notification" className="flex" onClick={()=>{setChange("notification")}}>
          <BellOutlined className="mt-1" /> <p className="mx-2">最新情報</p>
        </Link>
      </div>
    
    </div>
  );
  
};
export default Nav;