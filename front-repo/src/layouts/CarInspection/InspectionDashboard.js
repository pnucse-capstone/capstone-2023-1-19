import React, { useState, useEffect, useRef, useCallback } from 'react';
import CircularIndeterminate from 'components/Progress/CircularIndeterminate';
import {ToastContainer,toast} from 'react-toastify';
import GridComponent from './GridComponent';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const InspectionDashboard = ( ) => {
  const navigate = useNavigate();

  useEffect(() => {
    checkOrg();
  }, []);

  const checkOrg = () => {
    const org = localStorage.getItem('UserId');
    console.log(org);
    if (org == null || org !== 'inspector') {
      // alert("차량 검수자만 접속할 수 있는 페이지 입니다.");
      navigate("/home");
      toast.error("차량 검수 페이지는 차량 검수자만 접속할 수 있는 페이지 입니다.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', marginTop:30 }}>
      <GridComponent/>
    </div>
  );
};

export default InspectionDashboard;