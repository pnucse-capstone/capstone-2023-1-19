import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ThemeProvider,} from '@mui/styles';
import { createTheme } from "@mui/material";
import CarDetailComponent from './layouts/CarDetails/CarDetailComponent'
import SellCar from './layouts/Transaction/SellCar'
import SearchDashboard from './layouts/CarList/SearchDashboard';
import Sidebar from "./components/Sidebar/Sidebar";
import './app.css'
import Profile from "./layouts/Profile/Profile"
import SignIn from "./layouts/Profile/SignIn";
import SignUp from "./layouts/Profile/SignUp";
import Album from "./layouts/Main/Album";
import InfraSidebar from 'components/InfraSidebar/InfraSidebar';
import Blockchain from 'layouts/Blockchain/Blockchain';
import InspectionDashboard from "./layouts/CarInspection/InspectionDashboard";
import Navbar from 'components/Navbar/Navbar';
import Dashboard from 'layouts/Main/Dashboard';
import Cluster from 'layouts/Cluster/Cluster';
const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <InfraSidebar/>
        <div className="content">
          <Routes>
            <Route index element={< Dashboard/>} />
            <Route path="/cluster" element={< Cluster/>} />
            <Route exact path={"/sell"} element={<SellCar />} />
            <Route path="/blockchain" element={< Blockchain/>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;