import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select } from "antd";
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';


const UserDetail=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  const Id=useParams().id;
  // -------view
  const [reasondatas, setReasonDatas] = useState([]);
  const [introductiondatas, setIntroductionDatas] = useState([]);
  const [status, setStatus] = useState([]);
  const [tipings, setTipings] = useState([]);
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'/users/getone_reason?id='+Id,{
      }).then((res) => {
        // setDatas(res.data);
        if(res.data.length!==0){
          setReasonDatas(res.data);
        }
    });
    axios.get(process.env.REACT_APP_API+'/users/getone_introduction?id='+Id,{
      }).then((res) => {
        // setDatas(res.data);
        if(res.data.length!==0){
          setIntroductionDatas(res.data);
        }
    });
    axios.get(process.env.REACT_APP_API+'/users/getstatus?id='+Id,{
    }).then((res) => {
      if(res.data.length!==0){
        setStatus(res.data);
      }
    });
    axios.get(process.env.REACT_APP_API+'/users/get_tiping?id='+Id,{
    }).then((res) => {
      if(res.data.length!==0){
        setTipings(res.data);
      }
    });
    setFlage(false);
  }, [flag]);
  // console.log(tipings);
  const getRegistedate=()=>{
    var date="";
    if(reasondatas.length!==0){
      date=reasondatas.createdAt.slice(0,10);
    }
     return date;
  }
  const getDeletedDate=()=>{
    var date="";
    if(reasondatas.deleted_date){
      date=reasondatas.deleted_date.slice(0,10);
    }
     return date;
  }
  const getReasons=()=>{
    var result="";
    if(reasondatas.length!==0){
      for(let i=0;i<reasondatas.reasons.length;i++){
        result=result+reasondatas.reasons[i].text+"/ ";
      }
    }
    return result;
  }
  const getIntroductions=()=>{
    var result="";
    if(introductiondatas.length!==0){
      for(let i=0;i<introductiondatas.introductions.length;i++){
        result=result+introductiondatas.introductions[i].text+"/ ";
      }
    }
    return result;
  }
  const getStatus=()=>{
    const result=[];
    if(status.length!==0){
      var sum=0;
      for(let i=0;i<status.length;i++){
        result[i]={
          date:status[i].createdAt.slice(0, 10),
          status:status[i].status,
          amount:status[i].amount,
          total: sum+status[i].amount
        }
        sum=result[i].total
      }
      for(let i=0;i<status.length;i++){
        if(!result[i].amount){
          result[i].amount="無料";
        }else{
          result[i].amount=result[i].amount+"円";
        }
        result[i].total=result[i].total+"円";
      }
    }
    return result;
  }

  const getTipings=()=>{
    const result=[];
    if(tipings.length!==0){
      var sum=0;
      for(let i=0;i<tipings.length;i++){
        result[i]={
          date:tipings[i].createdAt.slice(0, 10),
          contentId:tipings[i].itemId,
          temple:tipings[i].item.temple,
          amount:tipings[i].amount,
          total: sum+tipings[i].amount
        }
        sum=result[i].total
      }
    }
    return result;
  }
  // ----------add
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-2">
        <p className="text-2xl text-left mx-10 font-bold">ユーザー詳細</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 h-10 text-center text-xl font-medium py-2">ID</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{reasondatas.id}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">お名前</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{reasondatas.name}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">ユーザー登録日</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{getRegistedate()}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">国</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{reasondatas.country}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">メールアドレス</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{reasondatas.email}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">GASSHOを何で知りましたか？</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{getIntroductions()}</p>  
          </div>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-20 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">GASSHOを使う理由</div>
          <div className="w-3/4 h-20 bg-gray-100 text-left border rounded-md p-2 flex-wrap">
            <p>{getReasons()}</p>
          </div>
        </div>
      </div>
      <div className="w-full my-2 flex">
        <div className="w-full h-32 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">ステータス履歴</div>
          <div className="w-3/4 h-32 bg-gray-100 px-2 border rounded-md overflow-y-auto">
            <table className="w-full text-center mt-2">
              <thead className="border">
                <tr>
                  <th>日付</th>
                  <th>ステータス</th>
                  <th>金額</th>
                  <th>総額</th>
                </tr>
              </thead>
              <tbody className="border bg-gray-100">
              {getStatus().map((data, index)=>{
                return(
                  <tr key={index}>
                    <td>{data.date}</td>
                    <td>{data.status}</td>
                    <td>{data.amount}</td>
                    <td>{data.total}</td>
                  </tr>
                )
              })}
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full my-2 flex">
        <div className="w-full h-32 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">投げ銭履歴</div>
          <div className="w-3/4 h-32 bg-gray-100 px-2 border rounded-md overflow-y-auto">
            <table className="w-full text-center mt-2">
              <thead className="border">
                <tr>
                  <th>日付</th>
                  <th>コンテンツID</th>
                  <th>お寺</th>
                  <th>金額</th>
                  <th>総額</th>
                </tr>
              </thead>
              <tbody className="border bg-gray-100">
                {getTipings().map((data, index)=>{
                  return(
                    <tr key={index}>
                      <td>{data.date}</td>
                      <td>{data.contentId}</td>
                      <td>{data.temple}</td>
                      <td>{data.amount}</td>
                      <td>{data.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full my-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">退会日</div>
          <div className="w-3/4 h-10 bg-gray-100 text-left border rounded-md p-2">
            <p>{getDeletedDate()}</p>  
          </div>
        </div>
      </div>
      <div className="w-full text-left my-4">
        <div className="w-1/4 text-center">
         <Link to="/admin/manage"><Button className="w-40 m-auto"><ArrowLeftOutlined /> 戻 る</Button></Link>
        </div>        
      </div>
    </div>
  );
  
};
export default UserDetail;