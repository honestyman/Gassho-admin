import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio } from "antd";
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons';


const UserManage=()=>{

  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [users, setUsers] = useState([]);
  const [flag, setFlage] = useState(true);
  const [searchclicked, setSearchClicked] = useState(false);
  const [deleted, setDeleted]=useState(false);

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [radio, setRadio]=useState("");
  const [registedstart, setRegistedStart]=useState("");
  const [registedend, setRegistedEnd]=useState("");
  const [withdrawalstart, setWithdrawalStart]=useState("");
  const [withdrawalend, setWithdrawalEnd]=useState("");

  const [searchname, setSearchName]=useState("");
  const [searchemail, setSearchEmail]=useState("");
  const [searchradio, setSearchRadio]=useState("");
  const [searchregistedstart, setSearchRegistedStart]=useState("");
  const [searchregistedend, setSearchRegistedEnd]=useState("");
  const [searchwithdrawalstart, setSearchWithdrawalStart]=useState("");
  const [searchwithdrawalend, setSearchWithdrawalEnd]=useState("");
  
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API+'/users/getall').then((res) => {
      setUsers(res.data);
    });
    setFlage(false);
  }, [flag]);
  
  const handleSearch=()=>{
    setSearchName(name);
    setSearchEmail(email);
    setSearchRadio(radio);
    setSearchRegistedStart(registedstart);
    setSearchRegistedEnd(registedend);
    setSearchWithdrawalStart(withdrawalstart);
    setSearchWithdrawalEnd(withdrawalend);
    setSearchClicked(true);
  }
  
  const checkRegistedDate=(value)=>{
    var _date=new Date(value);
    var _start=new Date(searchregistedstart);
    var _end=new Date(searchregistedend);
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
    return false
  }

  const checkWithdrawalDate=(value)=>{
    var _date=new Date(value);
    var _start=new Date(searchwithdrawalstart);
    var _end=new Date(searchwithdrawalend);
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
    return false
  }
  
  const setMapValue=()=>{
    const result=[];
    if(users){
      for(let i=0;i<users.length;i++){
        result[i]={
          id:users[i].id,
          name:users[i].name,
          email:users[i].email,
          country:users[i].country,
          registed_date:users[i].createdAt.slice(0,10),
          plan:users[i].plan,
          deleted_date:users[i].deleted_date
        }
      }
    }
    return result;
  }
  
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-4">
        <p className="text-2xl text-left mx-10 font-bold">ユーザー一覧</p>
      </div>
      <div className="w-full mb-4 flex">
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/2 text-center text-xl font-medium py-2">お名前</div>
          <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-1/2"/>
        </div>
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/3 text-center text-xl font-medium py-2">ユーザー登録日</div>
          <Input type="date" value={registedstart} onChange={(e)=>setRegistedStart(e.target.value)} className="w-1/4"/>
          <p className="mx-8 my-1">~</p>
          <Input type="date" value={registedend} onChange={(e)=>setRegistedEnd(e.target.value)} className="w-1/4"/>
        </div>
      </div>

      <div className="w-full mb-4 flex">
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/2 text-center text-xl font-medium py-2">メールアドレス</div>
          <Input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-1/2"/>
        </div>
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/3 text-center text-xl font-medium py-2">退会日</div>
          <Input type="date" value={withdrawalstart} onChange={(e)=>setWithdrawalStart(e.target.value)} className="w-1/4"/>
          <p className="mx-8 my-1">~</p>
          <Input type="date" value={withdrawalend} onChange={(e)=>setWithdrawalEnd(e.target.value)} className="w-1/4"/>
        </div>
      </div>

      <div className="w-full mb-4 flex">
          <div className="w-1/4 text-center text-xl font-medium mx-4 py-2">ステータス</div>
          <div className="w-1/2 py-2 text-left">
            <RadioGroup value={radio} onChange={(e)=>setRadio(e.target.value)}>
              <Radio value={"年額プラン"}>年額プラン</Radio>
              <Radio value={"月額プラン"}>月額プラン</Radio>
              <Radio value={"無料期間"}>無料期間</Radio>
              <Radio value={"退会"}>退会</Radio>
            </RadioGroup>
          </div> 
      </div>
      <Button onClick={handleSearch} className="w-40"><div className="flex mx-8"><SearchOutlined className="mt-1 mr-2"/>検 索</div></Button>
      <div className="w-full h-2/3 mt-5 p-5 overflow-y-auto">
      <table className="w-full border-collapse text-center mt-4 mx-auto shadow-md">
            <thead className="border">
              <tr>
                <th></th>
                <th>ID</th>
                <th>お名前</th>
                <th>メールアドレス</th>
                <th>登録日</th>
                <th>国</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody className="border bg-gray-100">
              {setMapValue().map((data, index)=>{
                if(searchclicked){
                  if(((data.name).includes(searchname) && searchname!=="") || ((data.email).includes(searchemail) && searchemail !== "") || searchradio===data.plan || checkRegistedDate(data.registed_date) || checkWithdrawalDate(data.deleted_date)){
                    return(
                      <tr key={index}>
                        <td className="text-blue-500 font-bold underline">
                          <Link to={'user_detail/' + data.id}><EllipsisOutlined /> 詳細</Link></td>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.registed_date}</td>
                        <td>{data.country}</td>
                        <td>{data.plan}</td>
                      </tr>
                    )
                  }
                }else{
                  return(
                    <tr key={index}>
                      <td className="text-blue-500 font-bold underline">
                        <Link to={'user_detail/' + data.id}><EllipsisOutlined /> 詳細</Link></td>
                      <td>{index+1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.registed_date}</td>
                      <td>{data.country}</td>
                      <td>{data.plan}</td>
                    </tr>
                  )
                }
              })}    
            </tbody>
          </table>
      </div>
    </div>
  );
  
};
export default UserManage;