import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Input, Radio, Select,message, Upload } from "antd";
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";


const UpdateSound=()=>{
  const RadioGroup=Radio.Group;
  const Id=useParams().id;

  // -------view
  const [categorys, setCategorys] = useState([]);
  const [alltag, setAllTag]=useState([]);
  const [flag, setFlage] = useState(true);
  const [datas, setDatas] = useState([]);

  const [temple, setTemple]=useState("")
  const [order, setOrder]=useState()
  const [category, setCategory]=useState("")
  const [japanesetitle, setJapaneseTitle]=useState("")
  const [englishtitle, setEnglishTitle]=useState("")
  const [japanesedescription, setJapaneseDescription]=useState("")
  const [englishdescription, setEnglishDescription]=useState("")
  const [tags, setTags]=useState()
  const [time, setTime]=useState(0)
  const [sound, setSound]=useState()
  const [file, setFile] = useState();
  const [fileflag, setFileFlag] = useState(true);

  const [validTemple, setValidTemple]=useState("")
  const [validOrder, setValidOrder]=useState("")
  const [validCategory, setValidCategory]=useState("")
  const [validJapanesetitle, setValidJapaneseTitle]=useState("")
  const [validEnglishtitle, setValidEnglishTitle]=useState("")
  const [validTags, setValidTags]=useState("")
  const [validTime, setValidTime]=useState("")
  const [validVimeourl, setValidVimeoUrl]=useState("")
  const [validJapaneseDescription, setValidJapaneseDescription]=useState("")
  const [validEnglishDescription, setValidEnglishDescription]=useState("")

  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'/items/getoneitem',{
        params:{
          id:Id
        }
      }).then((res) => {
        if(res.data.length!==0){
          setDatas(res.data);
        }
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
  }, [flag]);

  useEffect(() => {
    if(datas.length!==0 && categorys.length!==0){  
        setJapaneseTitle(datas.japanesetitle);
        setEnglishTitle(datas.englishtitle);
        setTime(datas.time);
        setTemple(datas.temple);
        setOrder(datas.order);

        // setImagename(datas.main_image_url);
        setJapaneseDescription(datas.japanesedescription);
        setEnglishDescription(datas.englishdescription);
        let temp=[];
        for(let i=0;i<categorys.length;i++){
          if(datas.categoryId===categorys[i].id){
            setCategory(categorys[i].name)
          }
        }
        for(let i=0;i<datas.tabs.length;i++){
          temp.push(datas.tabs[i].name);
        }
        setTags(temp); 
    } 
  }, [datas && categorys]);

  const getFileName=()=>{
    var str;
    if(datas){
      const myArray=(datas.main_image_url).split("/");
      str = myArray[myArray.length-1];
    }
    return str;
  }

  const changeTags=(value)=>{
    setTags(value);
  }
  const getSound=(e)=>{
    document.getElementById("sound_div").style.display="none";
    setSound(e.target.files[0])
  }
  const getFile=(e)=>{
    document.getElementById("image_div").style.display="none";
    document.getElementById("image_text").style.display="none";
    if(fileflag===true){
      setFile(e.file.originFileObj)
      }
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

  const handleBeforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const maxPixels = 500 * 500; // Maximum number of pixels

    if (!isJpgOrPng) {
      message.error('アップロードできる画像はJPG/PNGのみです！');
      setFileFlag(false);
    }

    // Calculate image dimensions using createImageBitmap
    const image = await createImageBitmap(file);
    const width = image.width;
    const height = image.height;
    const pixels = width * height;

    if (pixels > maxPixels) {
      message.error(`画像のサイズは500x500ピクセルを超えないこと！`);
      setFileFlag(false);
    }
    
    return isJpgOrPng && pixels <= maxPixels;
  };

  const handleAdd=async()=>{
    
    var updated=false;
    if(!temple){
      setValidTemple("お寺の名前を入力してください。");
    }else{
      setValidTemple("");
    }
    if(!order){
      setValidOrder("ホーム画面の並び順を入力してください。");
    }else{
      setValidOrder("");
    }
    if(!category){
      setValidCategory("カテゴリを選択してください。");
    }else{
      setValidCategory("");
    }
    if(!japanesetitle){
      setValidJapaneseTitle("動画タイトル(日)を入力してください。");
    }else{
      setValidJapaneseTitle("");
    }
    if(!englishtitle){
      setValidEnglishTitle("動画タイトル(英)を入力してください。");
    }else{
      setValidEnglishTitle("");
    }
    if(!japanesedescription){
      setValidJapaneseDescription("説明(日)を入力してください。");
    }else{
      setValidJapaneseDescription("");
    }
    if(!englishdescription){
      setValidEnglishDescription("説明(英)を入力してください。");
    }else{
      setValidEnglishDescription("");
    }
    if(!tags){
      setValidTags("タグを選択してください。");
    }else{
      setValidTags("");
    }
    if(!time){
      setValidTime("再生時間を入力してください。");
    }else{
      setValidTime("");
    }

    if(temple && order && category && japanesetitle && englishtitle && tags && time ){
      const data={
        id:Id,
        temple:temple,
        order:order,
        time:time,
        tags:tags,
        category:category,
        japanesetitle:japanesetitle,
        englishtitle:englishtitle,
        japanesedescription:japanesedescription,
        englishdescription:englishdescription,
        // soundname:sound.name,
        // filename:file.name  
      }
      if(sound){
        data.soundname=sound.name;
      }
      if(file){
        data.filename=file.name;
      }
      await axios.post(process.env.REACT_APP_API+"/items/updateitem_sound", data).then((res)=>{
        updated=true;
        alert("正確に変更されました。");
      }).catch(error=>{
        alert(error);
      });
    }
    if(sound && updated){
      const formData=new FormData();
      formData.append('sound',sound);
      formData.append('soundName',sound.name);
      const config={
        headers:{
          'content-type':'multipart/form-data',
        },
      };  
      axios.post(process.env.REACT_APP_API+"/item/addsound", formData, config)
        .then((response) => {
          console.log("success")
        })
        .catch((error) => {
          console.error("Error uploading files: ", error);
        });  
    }
    if(file && updated){
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
        <p className="text-2xl text-left mx-10 font-bold">音源編集</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">音源ID</div>
          <Input type="text" value={Id} disabled className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">お寺</div>
          <Input type="text" value={temple} onChange={(e)=>setTemple(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTemple}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">ホーム画面の並び順</div>
            <Input type="number" min={1} max={30} value={order} onChange={(e)=>setOrder(e.target.value)} className="w-1/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validOrder}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">カテゴリ</div>
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
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validCategory}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">動画タイトル（日）</div>
          <Input type="text" value={japanesetitle} onChange={(e)=>setJapaneseTitle(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validJapanesetitle}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">動画タイトル（英）</div>
          <Input type="text" value={englishtitle} onChange={(e)=>setEnglishTitle(e.target.value)} className="w-3/4"/>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validEnglishtitle}</p>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-20 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">説明（日）</div>
          <TextArea value={japanesedescription} onChange={(e)=>setJapaneseDescription(e.target.value)} className="w-3/4 h-20"/>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-20 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">説明（英）</div>
          <TextArea value={englishdescription} onChange={(e)=>setEnglishDescription(e.target.value)} className="w-3/4 h-20"/>
        </div>
      </div>
      <div className="w-full mb-2 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">タグ</div>
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
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTags}</p>
      </div>
      <div className="w-full mb-1 flex">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">再生時間</div>
          <Input type="number" value={time} onChange={(e)=>setTime(e.target.value)} className="w-40"/>
          <p className="text-sm m-2">分</p>
        </div>
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validTime}</p>
      </div>
      <div className="w-full mb-1">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">VimeoURL</div>
          <div className="w-1/4 text-left text-sm font-medium py-2">
            <Input type="file" onChange={getSound}/>
          </div>
        </div>
        {datas.main_image_url && <div id="sound_div" className="w-full h-16 mt-1 px-10 flex">
        <div className="w-1/4 text-center text-sm font-medium py-2"></div>  
        <p className="m-3">{datas.filename}</p>
        </div>}
      </div>
      <div className="w-full mb-1 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <p className="mx-6 text-red-500">{validVimeourl}</p>
      </div>
      <div className="w-full mb-2">
        <div className="w-full h-10 px-10 flex">
          <div className="w-1/4 text-center text-sm font-medium py-2">サムネイル</div>
          <div className="w-1/2 text-left text-sm font-medium py-2">
          <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              beforeUpload={handleBeforeUpload}
              onChange={getFile} 
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
              <p id="image_text" className="m-1 text-gray-500">画像のサイズは500px*500px以下の正方形。</p>
            </Upload>
          </div>
        </div>
        {datas.main_image_url && <div id="image_div" className="w-full h-16 mt-8 px-10 flex">
        <div className="w-1/4 text-center text-sm font-medium py-2"></div>
          <div className="w-1/2 flex text-sm font-medium border rounded p-2">
            <img src={process.env.REACT_APP_SERVER+datas.main_image_url} className="w-12"/>
            <p className="m-3">{getFileName()}</p>
          </div>
        </div>}
      </div>
      <div className="w-full text-center mt-24 flex">
        <div className="w-1/4 text-center">
         <Link to="/manage/sound"><Button className="w-48 m-auto"><ArrowLeftOutlined /> 戻 る</Button></Link>
        </div>
        <div className="w-3/4 text-center">
        <Button type="primary" onClick={handleAdd} className="w-80 text-black border-gray-300"><div className="flex mx-28"><SaveOutlined className="mr-2"/>登 録</div></Button>

        </div>        
      </div>
    </div>
  );
  
};
export default UpdateSound;