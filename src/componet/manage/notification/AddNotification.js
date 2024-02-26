import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select,InputNumber, Upload } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";


const AddNotification=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [japanesetext, setJapaneseText]=useState("")
  const [englishtext, setEnglishText]=useState("")
  const [senddate, setSendDate]=useState("")
  const [sendtime, setSendTime]=useState("")

  const [validJapanesetext, setValidJapaneseText]=useState("")
  const [validEnglishtext, setValidEnglishText]=useState("")
  const [validDate, setValidDate]=useState("")

  const handleAdd=async()=>{   
    if(!japanesetext){
      setValidJapaneseText("メッセージ（日）は有効です。");
    }else{
      setValidJapaneseText("");
    }
    if(!englishtext){
      setValidEnglishText("メッセージ（英）は有効です。");
    }else{
      setValidEnglishText("");
    }
    if(!senddate || !sendtime){
      setValidDate("送信日時は有効です。");
    }else{
      setValidDate("");
    }
    if(japanesetext && englishtext && senddate && sendtime){
      const data={
        japanesetext:japanesetext,
        englishtext:englishtext,
        senddate:senddate,
        sendtime:sendtime  
      }
      await axios.post(process.env.REACT_APP_API+"/notifications/addnotification", data).then((res)=>{
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
        <p className="text-2xl text-left mx-10 font-bold">最新情報登録</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-32 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-12">メッセージ（日）</div>
          <TextArea value={japanesetext} onChange={(e)=>setJapaneseText(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validJapanesetext}</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-32 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-12">メッセージ（英）</div>
          <TextArea value={englishtext} onChange={(e)=>setEnglishText(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validEnglishtext}</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">送信日時</div>
          <Input value={senddate} onChange={(e)=>setSendDate(e.target.value)} type="date" className="w-1/5"/>
          <Input value={sendtime} onChange={(e)=>setSendTime(e.target.value)} type="time" className="w-1/5 mx-2"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validDate}</p>
      </div>
      <div className="w-full text-center my-10 flex">
        <div className="w-1/4 text-center">
         <Link to="/admin/manage/notification"><Button className="w-48 m-auto"><ArrowLeftOutlined /> 戻 る</Button></Link>
        </div>
        <div className="w-3/4 text-center">
        <Button type="primary" onClick={handleAdd} className="w-80 text-black border-gray-300"><div className="flex mx-28"><SaveOutlined className="mr-2"/>登 録</div></Button>

        </div>        
      </div>
    </div>
  );
  
};
export default AddNotification;