import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Home, Search, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity } from '@mui/icons-material';
import { Link } from "react-router-dom";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';


const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">클라우드체인</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>      
            <p className="title">MAIN</p>
            <Link to="/home" style={{ textDecoration: "none" }}>
                <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
                </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/buy" style={{ textDecoration: "none" }}>
              <li>
                <Search className="icon" />
                <span>차량 구매</span>
              </li>
            </Link>
            <Link to="/sell" style={{ textDecoration: "none" }}>
              <li>
                <MonetizationOnIcon className="icon" />
                <span>차량 판매</span>
              </li>
            </Link>
            <Link to="/ix" style={{ textDecoration: "none"}}>
                <li>
                    <EngineeringIcon className="icon" />
                    <span>차량 검수</span>
                </li>
            </Link>
            <p className="title">Community</p>
            <Link to="/" style={{ textDecoration: "none"}}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>리뷰 조회</span>
              </li>
            </Link>
            <p className="title">USER</p>
            <Link to="/profile" style={{ textDecoration: "none"}}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>내 프로필</span>
              </li>
            </Link>
            <Link to="/" style={{ textDecoration: "none"}}>
              <li>
                <ExitToAppIcon className="icon" />
                <span>로그아웃</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  };

export default Sidebar;



// const Sidebar = () => {
//     return (
//       <div className="sidebar">
//         <div className="top">
//           <Link to="/" style={{ textDecoration: "none" }}>
//             <span className="logo">lamadmin</span>
//           </Link>
//         </div>
//         <hr />
//         <div className="center">
//           <ul>
//             <p className="title">MAIN</p>
//             <li>
//               <DashboardIcon className="icon" />
//               <span>Dashboard</span>
//             </li>
//             <p className="title">LISTS</p>
//             <Link to="/users" style={{ textDecoration: "none" }}>
//               <li>
//                 <PersonOutlineIcon className="icon" />
//                 <span>Users</span>
//               </li>
//             </Link>
//             <Link to="/products" style={{ textDecoration: "none" }}>
//               <li>
//                 <StoreIcon className="icon" />
//                 <span>Products</span>
//               </li>
//             </Link>
//             <li>
//               <CreditCardIcon className="icon" />
//               <span>Orders</span>
//             </li>
//             <li>
//               <LocalShippingIcon className="icon" />
//               <span>Delivery</span>
//             </li>
//             <p className="title">USEFUL</p>
//             <li>
//               <InsertChartIcon className="icon" />
//               <span>Stats</span>
//             </li>
//             <li>
//               <NotificationsNoneIcon className="icon" />
//               <span>Notifications</span>
//             </li>
//             <p className="title">SERVICE</p>
//             <li>
//               <SettingsSystemDaydreamOutlinedIcon className="icon" />
//               <span>System Health</span>
//             </li>
//             <li>
//               <PsychologyOutlinedIcon className="icon" />
//               <span>Logs</span>
//             </li>
//             <li>
//               <SettingsApplicationsIcon className="icon" />
//               <span>Settings</span>
//             </li>
//             <p className="title">USER</p>
//             <li>
//               <AccountCircleOutlinedIcon className="icon" />
//               <span>Profile</span>
//             </li>
//             <li>
//               <ExitToAppIcon className="icon" />
//               <span>Logout</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );
//   };
  