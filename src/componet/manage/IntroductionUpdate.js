import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import { useLocation } from "react-router-dom";


const IntroductionUpdate=()=>{
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const {TextArea}=Input;
  const navigate=useNavigate();
  const [searchParams]=useSearchParams();

  const [introductions, setIntroductions] = useState([]);
  const [textIntroduction, setIntroductionText]=useState("");
  const [entextIntroduction, setIntroductionEnText]=useState("");
  
  const [validTextIntroduction, setValidTextIntroduction]=useState("");
  const [validEnTextIntroduction, setValidEnTextIntroduction]=useState("");

  useEffect(() => {
    console.log(id)
    axios.get('http://localhost:5000/api/introductions/getoneintroduction',{
        params:{
          id:id
        }
      }).then((res) => {
        if(res.data.length!==0){
          setIntroductions(res.data);
        }
    });
  }, []);

  useEffect(() => {
    if(introductions.length!==0){  
        setIntroductionText(introductions.text);
        setIntroductionEnText(introductions.en_text);
        } 
  }, [introductions]);
  
  const changeTextIntroduction=(e)=>{
    setIntroductionText(e.target.value);
  }
  const changeEnTextIntroduction=(e)=>{
    setIntroductionEnText(e.target.value);
  }

  const handleUpdate=async(e)=>{
    e.preventDefault();
    if(!textIntroduction){
      setValidTextIntroduction("この項目は有効です。");
    }
    if(!entextIntroduction){
      setValidEnTextIntroduction("この項目は有効です。");
    }
    if(textIntroduction && entextIntroduction){
      const data={
        id:id,
        textIntroduction:textIntroduction,
        entextIntroduction:entextIntroduction
      }
      await axios.post("http://localhost:5000/api/introductions/updateintroduction", data).then((res)=>{
        // alert("パスワードは正しく変更されました。");
        // console.log(res.status);
        navigate("/admin/introduction");
        alert("正確に追加されました。");
      }).catch(error=>{
        console.log(error);
      });
    }
  }
  function moveFunction(){
    navigate("/admin/introduction");
  }

  return(
      <div className="w-1/2 mx-auto">
        <p className="text-3xl mt-20 mb-10 font-bold text-center">アイテムアップデート（「合唱」をどうやって知りましたか）</p>
        <form className="ml-24">
          <div>
          <p className='text-xl mx-2 my-2 mr-14 text-left'>日本語質問 :</p>
          </div>
          <Input className='w-5/6 h-10'
                type="text"
                name="title"
                id="title"
                onChange={changeTextIntroduction}
                value={textIntroduction}
              />
          <p className="ml-2 mt-1 text-left text-red-500">{validTextIntroduction}</p>

          <p className='text-xl mx-2 my-2 mr-14 text-left'>English Question :</p>
          <Input className='w-5/6 h-10'
                type="text"
                name="filename"
                id="filename"
                value={entextIntroduction}
                onChange={changeEnTextIntroduction}
          />
          <p className="mx-2 mt-1 text-left text-red-500">{validEnTextIntroduction}</p>

          <button className='w-5/6 h-12 mt-10 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={handleUpdate}>更新</button>
          <button className='w-5/6 h-12 mt-6 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={()=>moveFunction()}>戻る</button>
        </form>
      </div>
  );
  
};
export default IntroductionUpdate;