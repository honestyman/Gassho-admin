import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined, UndoOutlined } from '@ant-design/icons';


const SoundManage=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);
  const [datas, setDatas] = useState([]);
  const [cateorys, setCategorys] = useState([]);
  const [alltag, setAllTag]=useState([]);
  const [searchclicked, setSearchClicked] = useState(false);

  const [contenId, setContentId]=useState();
  const [tag, setTag]=useState();
  const [title, setTitle]=useState("");

  const [searchContentId, setSearchContentId]=useState(0);
  const [searchTag, setSearchTag]=useState("");
  const [searchTitle, setSearchTitle]=useState("");


  // ----------add
  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'/items/').then((res) => {
      setDatas(res.data);
    });
    axios.get(process.env.REACT_APP_API+'/items/getallcategory').then((res) => {
      //  alert(res.data.message);
      setCategorys(res.data);
    });
    axios.get(process.env.REACT_APP_API+'/items/getalltags').then((res) => {
      //  alert(res.data.message);
      setAllTag(res.data);
    });
    // setDeleted(false);
    setFlage(false);
    setDeleted(false);
  }, [flag, deleted]);

  const handleSearch=()=>{
    if(contenId || tag || title){
      setSearchContentId(contenId);
      let temp=""
      if(tag){
        for(let i=0;i<tag.length; i++){
          temp=temp+tag[i]+"/"
        }
      }
      setSearchTag(temp.slice(0, temp.length-1));
      setSearchTitle(title);
      setSearchClicked(true);
    }else{
      setSearchClicked(false);
    }
    
  }
  const handleReset=()=>{
    setContentId("")
    setTag("");
    setTitle("");
    setSearchClicked(false);
  }

  const changeTags=(value)=>{
    console.log(value)
    setTag(value);
  }

  const tagList=()=>{
    var str=[];
    for(let i=0;i<alltag.length; i++){
      str.push({
        value:alltag[i],
        label:alltag[i]
      });
    }
    return str;
  }
  const setMapValue=()=>{
    const result=[];
    const tab=[];
    let k=0;
    for(let i=0;i<datas.length; i++){
      const value=[];
      for(let j=0;j<cateorys.length;j++){
        if(datas[i].categoryId===cateorys[j].id){
          value[i]=cateorys[j].name
        }
      }
       if(datas[i].tabs.length!==0){
        let temp = "";
        for(let j=0;j<datas[i].tabs.length;j++){
          temp=temp+datas[i].tabs[j].name+"/"
        }
        tab[i] = temp.slice(0, temp.length-1);
       }
       if(datas[i].type==="音声"){
        result[k]={
          id:datas[i].id,
          title:datas[i].japanesetitle,
          type:datas[i].type,
          order:datas[i].order,
          temple:datas[i].temple,
          tabs:tab[i],
          registed_date:datas[i].createdAt.slice(0,10)
        }
        k++;
       }
    }
    return result;
  }

  function deleteFunction(id){
    // console.log("ssssss",id);
    axios.delete(process.env.REACT_APP_API+'/items/deleteoneitem?id='+id, ).then((res) => {
      setDeleted(true);
      alert("正確に追加されました。");
      console.log(res.status);
    });
  }
  
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 main"> 
      <div className="w-full h-10 mb-4">
        <p className="text-2xl text-left mx-10 font-bold">音源管理</p>
      </div>
      <div className="w-full mb-4 flex">
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/2 text-center text-sm font-medium py-2">音源ID</div>
          <Input value={contenId} onChange={(e)=>setContentId(e.target.value)} type="text" className="w-1/2"/>
        </div>
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/3 text-center text-sm font-medium py-2">タグ</div>
          <Select className="w-2/3" 
            mode="multiple"
            value={tag}
            onChange={(value) => {
              changeTags(value)
           }}
            options={
              tagList()
            }
            />
        </div>
      </div>

      <div className="w-full mb-4 flex">
        <div className="w-1/2 h-10 px-10 flex">
          <div className="w-1/2 text-center text-sm font-medium py-2">タイトル</div>
          <Input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="w-1/2"/>
        </div>
      </div>
      <Button onClick={handleSearch} className="w-40 bg-black text-white"><div className="flex mx-8"><SearchOutlined className="mt-1 mr-2"/>検 索</div></Button>
      <Button onClick={handleReset} className="w-40 bg-black text-white mx-2"><div className="flex mx-8"><UndoOutlined className="mt-1 mr-2"/>リセット</div></Button>
      <div className="w-full text-left mx-10">
      <Link to="/admin/manage/add_sound"><Button type="primary" className="w-40 text-white border-gray-300 bg-purple-700"><div className="flex mx-2"><PlusCircleOutlined className="mr-2"/>音源新規登録</div></Button></Link>
      </div>
      <div className="w-full h-2/3 p-5 overflow-y-auto">
      <table className="w-full border-collapse text-center text-sm mt-4 mx-auto shadow-md">
            <thead className="border">
              <tr>
                <th>操作</th>
                <th>コンテンツID</th>
                <th>並び順</th>
                <th>タイトル</th>
                <th>お寺</th>
                <th>タグ</th>
                <th>登録日</th>
              </tr>
            </thead>
            <tbody className="border bg-gray-100">
              {setMapValue().map((data, index) => {
                if(searchclicked ){
                  if(data.id==searchContentId || (searchTitle !== "" && (data.title).match(searchTitle)) || (searchTag!=="" && (data.tabs).match(searchTag))){
                    return (<tr key={index}>
                      <td className="w-40 text-blue-500 font-bold underline">
                        <Link className="mx-2 text-green-500"
                      to={"/admin/manage/update_video/"+data.id}
                      ><EditOutlined /> 編集</Link>
                      <Link className="mx-2 text-red-500" onClick={()=>deleteFunction(data.id)}
                      ><DeleteOutlined /> 削除</Link>
                      </td>
                      <td>{data.id}</td>
                      <td>{data.order}</td>
                      <td>{data.title}</td>
                      <td>{data.temple}</td>
                      <td>{data.tabs}</td>
                      <td>{data.registed_date}</td>
                    </tr>)
                  }
                }else{
                  return (<tr key={index}>
                    <td className="w-40 text-blue-500 font-bold underline">
                      <Link className="mx-2 text-green-500"
                    to={"/admin/manage/update_sound/"+data.id}
                    ><EditOutlined /> 編集</Link>
                    <Link className="mx-2 text-red-500" onClick={()=>deleteFunction(data.id)}
                    ><DeleteOutlined /> 削除</Link>
                    </td>
                    <td>{data.id}</td>
                    <td>{data.order}</td>
                    <td>{data.title}</td>
                    <td>{data.temple}</td>
                    <td>{data.tabs}</td>
                    <td>{data.registed_date}</td>
                  </tr>)
                }
                })}
            </tbody>
          </table>
      </div>
    </div>
  );
  
};
export default SoundManage;