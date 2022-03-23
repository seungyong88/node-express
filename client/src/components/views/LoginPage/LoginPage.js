import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'; 
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);  
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = async (event) =>  {
    event.preventDefault();

    let body = {
      email, password,
    }

    dispatch(loginUser(body))
      .then(res => {
        if(res.payload.loginSuccess) {
          navigate('/');
        }else{
          alert('존재하지 않는 아이디거나 비밀번호가 틀렸습니다.');
        }
      })
  } 

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh',
    }}>
      <form 
        style={{ display: 'flex',  flexDirection: 'column' }} 
        onSubmit={onSubmitHandler}
        >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage