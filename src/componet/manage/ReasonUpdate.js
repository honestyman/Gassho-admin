import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import { useLocation } from "react-router-dom";


const ReasonUpdate=()=>{
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const {TextArea}=Input;
  const navigate=useNavigate();
  const [searchParams]=useSearchParams();

  const [reasons, setReasons] = useState([]);
  const [textReason, setReasonText]=useState("");
  const [entextReason, setReasonEnText]=useState("");
  
  const [validTextReason, setValidTextReason]=useState("");
  const [validEnTextReason, setValidEnTextReason]=useState("");

  useEffect(() => {
    console.log(id)
    axios.get('http://localhost:5000/api/reasons/getonereason',{
        params:{
          id:id
        }
      }).then((res) => {
        if(res.data.length!==0){
          setReasons(res.data);
        }
    });
  }, []);

  useEffect(() => {
    if(reasons.length!==0){  
        setReasonText(reasons.text);
        setReasonEnText(reasons.en_text);
        } 
  }, [reasons]);
  
  const changeTextReason=(e)=>{
    setReasonText(e.target.value);
  }
  const changeEnTextReason=(e)=>{
    setReasonEnText(e.target.value);
  }

  const handleUpdate=async(e)=>{
    e.preventDefault();
    if(!textReason){
      setValidTextReason("この項目は有効です。");
    }
    if(!entextReason){
      setValidEnTextReason("この項目は有効です。");
    }
    if(textReason && entextReason){
      const data={
        id:id,
        textReason:textReason,
        entextReason:entextReason
      }
      await axios.post("http://localhost:5000/api/reasons/updatereason", data).then((res)=>{
        // alert("パスワードは正しく変更されました。");
        // console.log(res.status);
        navigate("/admin/reason");
        alert("正確に追加されました。");
      }).catch(error=>{
        console.log(error);
      });
    }
  }
  function moveFunction(){
    navigate("/admin/reason");
  }

  return(
      <div className="w-1/2 mx-auto">
        <p className="text-3xl mt-20 mb-10 font-bold text-center">アイテムの更新（「合唱」を使用する理由）</p>
        <form className="ml-24">
          <div>
          <p className='text-xl mx-2 my-2 mr-14 text-left'>日本語質問 :</p>
          </div>
          <Input className='w-5/6 h-10'
                type="text"
                name="title"
                id="title"
                onChange={changeTextReason}
                value={textReason}
              />
          <p className="ml-2 mt-1 text-left text-red-500">{validTextReason}</p>

          <p className='text-xl mx-2 my-2 mr-14 text-left'>English Question :</p>
          <Input className='w-5/6 h-10'
                type="text"
                name="filename"
                id="filename"
                value={entextReason}
                onChange={changeEnTextReason}
          />
          <p className="mx-2 mt-1 text-left text-red-500">{validEnTextReason}</p>

          <button className='w-5/6 h-12 mt-10 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={handleUpdate}>更新</button>
          <button className='w-5/6 h-12 mt-6 text-white rounded-full' style={{backgroundColor: "#8a56ac"}} onClick={()=>moveFunction()}>戻る</button>
        </form>
      </div>
  );
  
};
export default ReasonUpdate;