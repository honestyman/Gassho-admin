import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select,InputNumber, Upload } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";


const AddVideo=()=>{
  const navigate=useNavigate()
  const RadioGroup=Radio.Group;
  // -------view
  const [categorys, setCategorys] = useState([]);
  const [alltag, setAllTag]=useState([]);
  const [flag, setFlage] = useState(true);

  const [temple, setTemple]=useState("")
  const [order, setOrder]=useState()
  const [category, setCategory]=useState("")
  const [japanesetitle, setJapaneseTitle]=useState("")
  const [englishtitle, setEnglishTitle]=useState("")
  const [japanesedescription, setJapaneseDescription]=useState("")
  const [englishdescription, setEnglishDescription]=useState("")
  const [tags, setTags]=useState()
  const [time, setTime]=useState(0)
  const [vimeourl, setVimeoUrl]=useState("")
  const [file, setFile] = useState();

  const [validTemple, setValidTemple]=useState("")
  const [validOrder, setValidOrder]=useState("")
  const [validCategory, setValidCategory]=useState("")
  const [validJapanesetitle, setValidJapaneseTitle]=useState("")
  const [validEnglishtitle, setValidEnglishTitle]=useState("")
  const [validTags, setValidTags]=useState("")
  const [validTime, setValidTime]=useState("")
  const [validVimeourl, setValidVimeoUrl]=useState("")



  useEffect(() => {
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
  }, [flag]);
  const changeTags=(value)=>{
    setTags(value);
  }
  const getFile=(e)=>{
    setFile(e.target.files[0])
  }
  const categoryList=()=>{
    var str=[];
    for(let i=0;i<categorys.length; i++){
      str.push({
        value:categorys[i].name,
        label:categorys.name
      });
    }
    return str;
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

  function onChangeOrder(value) {
    setOrder(value);
  }
  const handleAdd=async()=>{
    // console.log(filename);
    var added=false;
    if(!temple){
      setValidTemple("お寺は有効です。");
    }else{
      setValidTemple("");
    }
    if(!order){
      setValidOrder("ホーム画面の並び順は有効です。");
    }else{
      setValidOrder("");
    }
    if(!category){
      setValidCategory("カテゴリは有効です。");
    }else{
      setValidCategory("");
    }
    if(!japanesetitle){
      setValidJapaneseTitle("動画タイトル（日）は有効です。");
    }else{
      setValidJapaneseTitle("");
    }
    if(!englishtitle){
      setValidEnglishTitle("動画タイトル（英）は有効です。");
    }else{
      setValidEnglishTitle("");
    }
    if(!tags){
      setValidTags("タグは有効です。");
    }else{
      setValidTags("");
    }
    if(!time){
      setValidTime("再生時間は有効です。");
    }else{
      setValidTime("");
    }
    if(!vimeourl){
      setValidVimeoUrl("VimeoURLは有効です。")
    }else{
      setValidVimeoUrl("")
    }
    console.log(file);

    if(temple && order && category && japanesetitle && englishtitle && tags && time && vimeourl){
      const data={
        temple:temple,
        order:order,
        time:time,
        tags:tags,
        category:category,
        japanesetitle:japanesetitle,
        englishtitle:englishtitle,
        japanesedescription:japanesedescription,
        englishdescription:englishdescription,
        vimeourl:vimeourl,
        filename:file.name  
      }
      await axios.post(process.env.REACT_APP_API+"/items/additem_video", data).then((res)=>{
        added=true;
        alert("正確に追加されました。");
      }).catch(error=>{
        console.log(error);
      });
    }

    if(file && added){
      const formData=new FormData();
      formData.append('file',file);
      formData.append('fileName',file.name);
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/item/addimage", formData, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error uploading files: ", error);
        });
    }
  }

  // ----------add
  return(
    <div className="p-10 bg-white shadow-md mx-auto my-3 overflow-y-auto main"> 
      <div className="w-full h-10 mb-2">
        <p className="text-2xl text-left mx-10 font-bold">動画新規登録</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">お寺</div>
          <Input type="text" value={temple} onChange={(e)=>setTemple(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTemple}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">ホーム画面の並び順</div>
            <InputNumber min={1} max={30} onChange={onChangeOrder} className="w-1/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validOrder}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">カテゴリ</div>
          <div className="w-3/4 text-left py-2">
            <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
              {
                categoryList().map((data, index)=>{
                  return(
                    <Radio key={index} value={data.value}>{data.value}</Radio>
                      )
                })
              }
              </RadioGroup>
          </div>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validCategory}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">動画タイトル（日）</div>
          <Input type="text" value={japanesetitle} onChange={(e)=>setJapaneseTitle(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validJapanesetitle}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">動画タイトル（英）</div>
          <Input type="text" value={englishtitle} onChange={(e)=>setEnglishTitle(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validEnglishtitle}</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-20 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">説明（日）</div>
          <TextArea value={japanesedescription} onChange={(e)=>setJapaneseDescription(e.target.value)} className="w-3/4 h-20"/>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-20 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">説明（英）</div>
          <TextArea value={englishdescription} onChange={(e)=>setEnglishDescription(e.target.value)} className="w-3/4 h-20"/>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">タグ</div>
          <Select className="w-3/4" 
            mode="multiple"
            value={tags}
            onChange={(value) => {
              changeTags(value)
           }}
            options={
              tagList()
            }
            />
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTags}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">再生時間</div>
          <Input type="number" value={time} onChange={(e)=>setTime(e.target.value)} className="w-40"/>
          <p className="text-xl m-2">分</p>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTime}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">VimeoURL</div>
          <Input type="text" value={vimeourl} onChange={(e)=>setVimeoUrl(e.target.value)} placeholder="vimeo.com/vimeoId" className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validVimeourl}</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-xl font-medium py-2">サムネイル</div>
          <div className="w-1/4 text-left text-xl font-medium py-2">
            <Input type="file" onChange={getFile}/>
          </div>
        </div>
      </div>
      <div className="w-full text-center my-10 flex">
        <div className="w-1/4 text-center">
         <Link to="/admin/manage/video"><Button className="w-48 m-auto"><ArrowLeftOutlined /> 戻 る</Button></Link>
        </div>
        <div className="w-3/4 text-center">
        <Button type="primary" onClick={handleAdd} className="w-80 text-black border-gray-300"><div className="flex mx-28"><SaveOutlined className="mr-2"/>登 録</div></Button>

        </div>        
      </div>
    </div>
  );
  
};
export default AddVideo;