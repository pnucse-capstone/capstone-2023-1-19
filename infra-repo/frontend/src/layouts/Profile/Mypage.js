import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import SignIn from './SignIn'

function Mypage(data) {
    const navigate = useNavigate()

    const nav = (url) => {
        console.log("check for nav");
        navigate(url)
    }
    useEffect(() => {
        console.log(data);
    }, []);
    return ( (data == null) ? (<h1>MYpage</h1>) : <SignIn /> );
}

export default Mypage;