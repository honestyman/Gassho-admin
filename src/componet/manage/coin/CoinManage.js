import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select } from "antd";
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';


const CoinManage=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);
  const [searchclicked, setSearchClicked] = useState(false);
  const [datas, setDatas]=useState([]);

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [temple, setTemple]=useState("");
  const [paystart, setPayStart]=useState("");
  const [payend, setPayEnd]=useState("");

  const [searchname, setSearchName]=useState("");
  const [searchemail, setSearchEmail]=useState("");
  const [searchtemple, setSearchTemple]=useState("");
  const [searchpaystart, setSearchPayStart]=useState("");
  const [searchpayend, setSearchPayEnd]=useState("");

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API+'/users/getgivelist').then((res) => {
      if(res.data){
        setDatas(res.data);
      }
    });
    setFlage(false);  
  }, [flag]);
  // console.log(datas)
  const handleSearch=()=>{
    if(name || email || temple || paystart || payend){
      setSearchName(name);
      setSearchEmail(email);
      setSearchTemple(temple);
      setSearchPayStart(paystart);
      setSearchPayEnd(payend);
      setSearchClicked(true);
    }else{
      setSearchClicked(false);
    }
    
  }
  const handleReset=()=>{
    setName("");
    setEmail("");
    setTemple("");
    setPayStart("");
    setPayEnd("");
    setSearchClicked(false);
}

  const checkSearchDate=(value)=>{
    if(value){
      var _date=new Date(value);
      var _start=new Date(searchpaystart);
      var _end=new Date(searchpayend);
      var date=_date.getTime();
      var start=_start.getTime();
      var end=_end.getTime();
      if(start && !end){
        return start<date
      }else if(!start && end){
        return date<end
      }else if(start && end){
        return start<date && date<end
      }
    }
    return false
  }

  const setMapValue=()=>{
    const result=[];
    for(let i=0;i<datas.length;i++){
      result[i]={
        userId:datas[i].userId,
        name:datas[i].name,
        email:datas[i].email,
        temple:datas[i].temple,
        contentId:datas[i].contentId,
        paymentdate:datas[i].paymentdate.slice(0,10),
        amount:datas[i].amount,
        status:"決済済み"
      }
    }
    return result;
  }
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-4">
        <p className="text-2xl text-left mx-10 font-bold">投げ銭一覧</p>
      </div>
      <div className="w-full mb-4 flex">
        <div className="w-1/3 h-10 flex">
          <div className="w-1/2 text-center text-sm font-medium py-2">お名前</div>
          <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-1/2"/>
        </div>
        <div className="w-2/3 h-10 flex">
          <div className="w-1/3 text-center text-sm font-medium py-2">決済日</div>
          <Input type="date" value={paystart} onChange={(e)=>setPayStart(e.target.value)} className="w-1/4 min-w-min"/>
          <p className="mx-2 my-1">~</p>
          <Input type="date" value={payend} onChange={(e)=>setPayEnd(e.target.value)} className="w-1/4 min-w-min"/>
        </div>
      </div>

      <div className="w-full mb-4 flex">
        <div className="w-1/3 h-10 flex">
          <div className="w-1/2 text-center text-sm font-medium py-2">メールアドレス</div>
          <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-1/2"/>
        </div>
        <div className="w-2/3 h-10 flex">
          <div className="w-1/3 text-center text-sm font-medium py-2">お寺</div>
          <Input type="text" value={temple} onChange={(e)=>setTemple(e.target.value)} className="w-1/3"/>
        </div>
      </div>   
      <Button onClick={handleSearch} className="w-40 bg-black text-white"><div className="flex mx-8"><SearchOutlined className="mt-1 mr-2"/>検 索</div></Button>
      <Button onClick={handleReset} className="w-40 bg-black text-white mx-2"><div className="flex mx-8"><UndoOutlined className="mt-1 mr-2"/>リセット</div></Button>
      <div className="w-full h-2/3 mt-5 p-5 overflow-y-auto">
      <table className="w-full border-collapse text-center text-sm mt-4 mx-auto shadow-md">
            <thead className="border">
              <tr>
                <th>ユーザーID</th>
                <th>お名前</th>
                <th>メールアドレス</th>
                <th>お寺</th>
                <th>コンテンツID</th>
                <th>決済日</th>
                <th>決済金額</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody className="border bg-gray-100">
              {setMapValue().map((data, index) => {
                if(searchclicked){
                  if(((data.name).includes(searchname) && searchname!=="") || ((data.email).includes(searchemail) && searchemail !== "") || ((data.temple).includes(searchtemple) && searchtemple !== "") || checkSearchDate(data.paymentdate)){
                    return (<tr key={index}>
                      <td>{data.userId}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.temple}</td>
                      <td>{data.contentId}</td>
                      <td>{data.paymentdate}</td>
                      <td>{data.amount}</td>
                      <td>{data.status}</td>
                    </tr>)    
                  }
                }else{
                  return (<tr key={index}>
                    <td>{data.userId}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.temple}</td>
                    <td>{data.contentId}</td>
                    <td>{data.paymentdate}</td>
                    <td>{data.amount}</td>
                    <td>{data.status}</td>
                  </tr>)
                }
                })}
            </tbody>
          </table>
      </div>
    </div>
  );
  
};
export default CoinManage;