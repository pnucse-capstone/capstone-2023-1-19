import React, { useState, useEffect, useRef, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    useEffect(() => {
        logout();
        window.location.assign("http://localhost:3000/home");
        // navigate("/home");
      }, []);
      const navigate = useNavigate();
      const logout = () => {
        localStorage.removeItem('Org');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserName');
        localStorage.removeItem('user');
        localStorage.removeItem('Authorization');
      };

    return (<div></div>);
};

export default Logout;