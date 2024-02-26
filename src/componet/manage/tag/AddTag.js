import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select,InputNumber, Upload } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";


const AddTag=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);

  const [name, setName]=useState("");
  const [valideName, setValidName]=useState("");

  const handleAdd =async()=> {
    if(!name){
      setValidName("タグ名は有効です。");
    }else{
      setValidName("");
    }
    const data={
      name:name
    }
    if(name){
      await axios.post(process.env.REACT_APP_API+"/items/addtab", data).then((res)=>{
        alert("正確に追加されました。");
      }).catch(error=>{
        console.log(error);
      });
    }
  }
  // ----------add
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-2">
        <p className="text-2xl text-left mx-10 font-bold">タグ新規登録</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">タグ名称</div>
          <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{valideName}</p>
      </div>
      
      <div className="w-full text-center my-10 flex">
        <div className="w-1/4 text-center">
         <Link to="/admin/manage/tag"><Button className="w-48 m-auto"><ArrowLeftOutlined /> 戻 る</Button></Link>
        </div>
        <div className="w-3/4 text-center">
        <Button onClick={handleAdd} type="primary" className="w-80 text-black border-gray-300"><div className="flex mx-28"><SaveOutlined className="mr-2"/>登 録</div></Button>

        </div>        
      </div>
    </div>
  );
  
};
export default AddTag;