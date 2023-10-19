import React from 'react';
import {useNavigate} from 'react-router-dom'
import { Home, Search, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity } from '@mui/icons-material';

import "./sidebar.css";
import SidebarLink from "./SidebarLink";

function Sidebar(){
  const navigate = useNavigate()

  const nav = (url) => {
    navigate(url)
  }

  return(
    <div className="sidebar" style={{backgroundColor: "#e3e3e3"}}>
      <SidebarLink text="메인 화면" Icon={Home} onClick={() => nav('/home')} />
      <SidebarLink text="차량 구매" Icon={Search} onClick={() => nav('/buy')} />
      <SidebarLink text="차량 판매" Icon={ListAlt} onClick={() => nav('/sell')} />
      <SidebarLink text="알림" Icon={NotificationsNone} onClick={() => nav('/notifications')} />
      <SidebarLink text="내 정보" Icon={PermIdentity} onClick={() => nav('/profile')} />
      <SidebarLink text="관심 목록" Icon={BookmarkBorder} onClick={() => nav('/bookmarks')} />
    </div>
  );
}

export default Sidebar;