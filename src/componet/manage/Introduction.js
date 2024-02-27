import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Select } from "antd";

const Introduction=()=>{
  const navigate=useNavigate()
  // -------view
  // const [introductions, setIntroductions] = useState([]);
  const [introductions, setIntroductions] = useState([]);
  const [flag, setFlage] = useState(true);
  const [deleted, setDeleted]=useState(false);

  // ----------add

  const [textIntroduction, setIntroductionText]=useState("");
  const [entextIntroduction, setIntroductionEnText]=useState("");
  
  const [validTextIntroduction, setValidTextIntroduction]=useState("");
  const [validEnTextIntroduction, setValidEnTextIntroduction]=useState("");

  const changeTextIntroduction=(e)=>{
    setIntroductionText(e.target.value);
  }
  const changeEnTextIntroduction=(e)=>{
    setIntroductionEnText(e.target.value);
  }

  const handleAdd=async(e)=>{
    
    e.preventDefault();
    if(!textIntroduction){
      setValidTextIntroduction("この項目は有効です。");
    }
    if(!entextIntroduction){
      setValidEnTextIntroduction("この項目は有効です。");
    }
    if(textIntroduction && entextIntroduction){
      const data={
        textIntroduction:textIntroduction,
        entextIntroduction:entextIntroduction
      }
      await axios.post("http://localhost:5000/api/introductions/add", data).then((res)=>{
        alert("正確に追加されました。");
        setFlage(true)
      }).catch(error=>{
        console.log(error);
      });
    }
  }

  const clearFunction=async(e)=>{
    e.preventDefault();
    setIntroductionText("");
    setIntroductionEnText("");
    // console.log("123",searchParams.size) 
  }
  function updateFunction(id){
    // console.log("ssssss",id);

    navigate("/introduction_update/?id="+id);
  }
  function deleteFunction(id){
    // console.log("ssssss",id);
    axios.delete('http://localhost:5000/api/introductions/delete?id='+id, ).then((res) => {
      setDeleted(true);
      console.log(res.status);
    });
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/introductions/').then((res) => {
      setIntroductions(res.data);
    });
    // axios.get('http://localhost:5000/api/items/getallcategory').then((res) => {
    //   //  alert(res.data.message);
    //   setCategorys(res.data);
    // });
    setFlage(false);
  }, [flag, deleted]);
  
  return(
    <div className="w-full text-center flex"> 
      <div className="w-2/3 pt-5 text-gray-700 content_field overflow-y-auto">
        {/* <ContentView/> */}
        <div className="text-center px-4">
          <p className="text-2xl font-bold">「合唱」をどのように知りましたか</p>
          <table className="border-collapse text-center mt-4 mx-auto w-100">
            <thead className="border rounded bg-gray-300">
              <tr>
                <th>No</th>
                <th>日本語質問</th>
                <th>English Question</th>
                <th>更新/削除</th>
              </tr>
            </thead>
            <tbody>
              {introductions.map((data, index) => {
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.text}</td>
                  <td>{data.en_text}</td>
                  <td>
                    <div className="flex">
                      <button className='w-16 h-6 mx-1 text-white rounded-full bg-green-500' onClick={()=>updateFunction(data.id)}>更新</button>
                      <button className='w-16 h-6 mx-1 text-white rounded-full bg-red-500' onClick={()=>deleteFunction(data.id)}>削除</button>
                    </div>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/3 pt-5 text-gray-700 content_field overflow-y-auto">
        {/* <ContentAdd/> */}
        <div>
        <p className="text-3xl mb-10 font-bold">アイテムを追加</p>
        <form>
          <div className="m-atuo">
          <p className='text-sm mx-12 my-2 mr-14 text-left'>日本語質問 :</p>
          </div>
          <Input className='w-5/6 h-10'
                type="text"
                name="text"
                id="text"
                onChange={changeTextIntroduction}
                value={textIntroduction}
              />
          <p className="ml-12 mt-1 text-left text-red-500">{validTextIntroduction}</p>
          <p className='text-sm mx-12 my-2 mr-14 text-left'>English Question :</p>
          <Input className='w-5/6 h-10'
                type="text"
                name="en_text"
                id="en_text"
                value={entextIntroduction}
                onChange={changeEnTextIntroduction}
          />
          <p className="mx-12 mt-1 text-left text-red-500">{setValidEnTextIntroduction}</p>

          <button className='w-5/6 h-12 mt-10 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={handleAdd}>追加</button>
          <button className='w-5/6 h-12 mt-6 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={clearFunction}>リセット</button>
        </form>
      </div>
      </div>
    </div>
  );
  
};
export default Introduction;