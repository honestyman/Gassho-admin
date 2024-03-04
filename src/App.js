import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ChangePassword from './componet/ChangePassword';
import Login from './componet/Login';
import Admin from './componet/Admin';
import ReasonUpdate from './componet/manage/ReasonUpdate';
import IntroductionUpdate from './componet/manage/IntroductionUpdate';
import UserManage from './componet/manage/user/UserManage';
import UserDetail from './componet/manage/user/UserDetail';
import SubscriptionManage from './componet/manage/subscription/SubscriptionManage';
import VideoManage from './componet/manage/video/VideoManage';
import AddVideo from './componet/manage/video/AddVideo';
import SoundManage from './componet/manage/sound/SoundManage';
import AddSound from './componet/manage/sound/AddSound';
import CoinManage from './componet/manage/coin/CoinManage';
import TagManage from './componet/manage/tag/TagManage';
import AddTag from './componet/manage/tag/AddTag';
import NotificationManage from './componet/manage/notification/NotificationManage';
import AddNotification from './componet/manage/notification/AddNotification';
import UpdateVideo from './componet/manage/video/UpdateVideo';
import UpdateSound from './componet/manage/sound/UpdateSound';
import UpdateTag from './componet/manage/tag/UpdateTag';
import UpdateNotification from './componet/manage/notification/UpdateNotification';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/:id/:token" element={<ChangePassword />}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/reason_update' element={<ReasonUpdate/>}/>
          <Route path='/introduction_update' element={<IntroductionUpdate/>}/>
          <Route path='/manage' element={<Admin/>}>
            <Route index element={<UserManage/>}/>
            <Route path='user_detail/:id' element={<UserDetail/>}/>
            <Route path='subscription' element={<SubscriptionManage/>}/>
            <Route path='video' element={<VideoManage/>}/>
            <Route path='add_video' element={<AddVideo/>}/>
            <Route path='update_video/:id' element={<UpdateVideo/>}/>
            <Route path='sound' element={<SoundManage/>}/>
            <Route path='add_sound' element={<AddSound/>}/>
            <Route path='update_sound/:id' element={<UpdateSound/>}/>
            <Route path='coin' element={<CoinManage/>}/>
            <Route path='tag' element={<TagManage/>}/>
            <Route path='add_tag' element={<AddTag/>}/>
            <Route path='update_tag/:id' element={<UpdateTag/>}/>
            <Route path='notification' element={<NotificationManage/>}/>
            <Route path='add_notification' element={<AddNotification/>}/>
            <Route path='update_notification/:id' element={<UpdateNotification/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
