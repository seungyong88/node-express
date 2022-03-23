import React, { useEffect } from 'react'
import axios from 'axios';
import {
  Link,
  Outlet,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function RendingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/hello').then(res => console.log(res.data));
  }, [])


  const onClickHandler = () => {
    axios.get('/api/users/logout').then(res => {
      if(res.data.success){
        navigate('/login');
      }else{
        alert('로그아웃 실패');
      }
    });
  }

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh', flexDirection: 'column'
    }}>
      <h2> 시작 페이지 </h2>
      <button onClick={onClickHandler}>로그아웃</button>
      <nav>
        <Link to="login">login</Link>{" "}
        <Link to="register">register</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

export default RendingPage