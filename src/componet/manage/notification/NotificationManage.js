import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';


const NotificationManage = () => {
  const navigate = useNavigate()
  const RadioGroup = Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [datas, setDatas] = useState([]);

  // ----------add
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + '/notifications/').then((res) => {
      if (res.data) {
        setDatas(res.data);
      }
    });
    setFlage(false);
    setDeleted(false);
  }, [flag, deleted]);

  const setMapValue = () => {
    const result = [];
    if (datas) {
      for (let i = 0; i < datas.length; i++) {
        var date = datas[i].send_date
        var time = datas[i].send_time
        result[i] = {
          id: datas[i].id,
          japanesetext: datas[i].japanesetext,
          englishtext: datas[i].englishtext,
          send_date: date + " " + time
        }
      }
    }
    return result;
  }

  function deleteFunction(id){
    // console.log("ssssss",id);
    axios.delete(process.env.REACT_APP_API+'/notifications/deleteone?id='+id, ).then((res) => {
      setDeleted(true);
      alert("正確に追加されました。");  
      console.log(res.status);
    });
  }

  return (
    <div className="p-10 bg-white shadow-md mx-auto my-3 main">
      <div className="w-full h-10 mb-4">
        <p className="text-2xl text-left mx-10 font-bold">最新情報</p>
      </div>
      <div className="w-full text-left mx-10">
        <Link to="//manage/add_notification"><Button type="primary" className="w-40 text-black border-gray-300"><div className="flex mx-4"><PlusCircleOutlined className="mr-2" />新規登録</div></Button></Link>
      </div>
      <div className="w-full h-2/3 p-5 overflow-y-auto">
        <table className="w-full border-collapse text-center text-sm mt-4 mx-auto shadow-md">
          <thead className="border">
            <tr>
              <th>操作</th>
              <th>ID</th>
              <th>メッセージ（日）</th>
              <th>メッセージ（英）</th>
              <th>送信日時</th>
            </tr>
          </thead>
          <tbody className="border bg-gray-100">
            {setMapValue().map((data, index) => {
              return (<tr key={index}>
                <td className="w-40 text-blue-500 font-bold underline">
                  <Link className="mx-2 text-green-500"
                    to={"//manage/update_notification/" + data.id}
                  ><EditOutlined /> 編集</Link>
                  <Link className="mx-2 text-red-500"
                    onClick={()=>deleteFunction(data.id)}
                  ><DeleteOutlined /> 削除</Link>
                </td>
                <td>{index + 1}</td>
                <td>{data.japanesetext}</td>
                <td>{data.englishtext}</td>
                <td>{data.send_date}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

};
export default NotificationManage;