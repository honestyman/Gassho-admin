import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';


const TagManage=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);
  const [datas, setDatas] = useState([]);

  // ----------add
  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'/items/getalltab').then((res) => {
      if(res.data){
        setDatas(res.data);
      }
    });
    setDeleted(false);
    setFlage(false);
  }, [flag, deleted]);

  function deleteFunction(id){
    // console.log("ssssss",id);
    axios.delete(process.env.REACT_APP_API+'/items/deletetag?id='+id ).then((res) => {
      setDeleted(true);
      alert("正確に追加されました。");
      console.log(res.status);
    });
  }
  
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-4">
        <p className="text-2xl text-left mx-10 font-bold">タグ管理</p>
      </div>
      <div className="w-full text-left mx-10">
      <Link to="//manage/add_tag"><Button type="primary" className="w-40 text-black border-gray-300"><div className="flex mx-2"><PlusCircleOutlined className="mr-2"/>タグ新規登録</div></Button></Link>
      </div>
      <div className="w-full h-2/3 p-5 overflow-y-auto">
      <table className="w-full border-collapse text-center text-sm mt-4 mx-auto shadow-md">
            <thead className="border">
              <tr>
                <th>操作</th>
                <th>名称</th>
                <th>登録日</th> 
              </tr>
            </thead>
            <tbody className="border bg-gray-100">
              {datas.map((data, index) => {
                  return (<tr key={index}>
                    <td className="w-40 text-blue-500 font-bold underline">
                      <Link className="mx-2 text-green-500"
                    to={"//manage/update_tag/"+data.id}
                    ><EditOutlined /> 編集</Link>
                    <Link className="mx-2 text-red-500"
                    onClick={()=>deleteFunction(data.id)}
                    ><DeleteOutlined /> 削除</Link>
                    </td>
                    <td>{data.name}</td>
                    <td>{data.createdAt.slice(0,10)}</td>
                  </tr>)
                })}
            </tbody>
          </table>
      </div>
    </div>
  );
  
};
export default TagManage;