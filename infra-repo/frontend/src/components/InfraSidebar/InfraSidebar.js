import "./InfraSidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Home, Search, NotificationsNone, MailOutline, BookmarkBorder, ListAlt, PermIdentity } from '@mui/icons-material';
import { Link } from "react-router-dom";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';


const InfraSidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Cloud Chain</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>      
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
                <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
                </li>
            </Link>
            <p className="title">Cluster</p>
            <Link to="/Cluster" style={{ textDecoration: "none" }}>
              <li>
                <ListIcon className="icon" />
                <span>Configuration</span>
              </li>
            </Link>
            <p className="title">Monitor</p>
            <Link to="/blockchain" style={{ textDecoration: "none"}}>
              <li>
                <WidgetsIcon className="icon" />
                <span>Blockchain</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  };

export default InfraSidebar;