import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Search } from '@mui/icons-material';
import { Link } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';


const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/home" style={{ textDecoration: "none" }}>
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
                <span>대시보드</span>
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
            <Link to="/compromise" style={{ textDecoration: "none" }}>
              <li>
                <UpdateIcon className="icon" />
                <span>거래 기록</span>
              </li>
            </Link>
            <Link to="/ix" style={{ textDecoration: "none"}}>
                <li>
                    <EngineeringIcon className="icon" />
                    <span>차량 검수</span>
                </li>
            </Link>
            {/* <p className="title">Community</p>
            <Link to="/" style={{ textDecoration: "none"}}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>리뷰 조회</span>
              </li>
            </Link> */}
            <p className="title">USER</p>
            <Link to="/profile" style={{ textDecoration: "none"}}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>내 프로필</span>
              </li>
            </Link>
            <Link to="/logout" style={{ textDecoration: "none"}}>
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
