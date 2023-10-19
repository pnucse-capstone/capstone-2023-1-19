import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { ThemeProvider,} from '@mui/styles';
import { createTheme } from "@mui/material";
import CarDetailLoading from './layouts/CarDetails/CarDetailLoading'
import SellCar from './layouts/CarSelling/SellCar'
import SearchDashboard from './layouts/CarList/SearchDashboard';
import CompromiseDashboard from 'layouts/CarCompromise/CompromiseDashboard';
import Sidebar from "./components/Sidebar/Sidebar";
import './app.css'
import Profile from "./layouts/Profile/Profile"
import SignIn from "./layouts/Profile/SignIn";
import SignUp from "./layouts/Profile/SignUp";
import Logout from "./layouts/Profile/Logout";
import Album from "./layouts/Main/Album";
import InspectionDashboard from "./layouts/CarInspection/InspectionDashboard";
import Navbar from 'components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme();


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <Sidebar/>
        <div className="content">
          <Navbar/>
          <Routes>
            <Route exact path="" element={< Album/>} />
            <Route exact path="/home" element={< Album/>} />
            <Route exact path={"/buy"} element={<SearchDashboard />} />
            <Route exact path={"/sell"} element={<SellCar />} />
            <Route exact path={"/compromise"} element={<CompromiseDashboard />} /> 
            <Route path="/buy/:id" element={< CarDetailLoading/>} />
            <Route exact path="/profile" element={< Profile/>} />
            <Route exact path="/signin" element={< SignIn/>} />
            <Route exact path="/signup" element={< SignUp/>} />
            <Route exact path="/logout" element={< Logout/>} />
            <Route exact path="/ix" element={<InspectionDashboard/>}/>
          </Routes>
          <ToastContainer position="top-left"/>
        </div>
      </div>
    </ThemeProvider>

  );
};

export default App;