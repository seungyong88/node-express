import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'; 
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);  
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);  
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setconfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = async (event) =>  {
    event.preventDefault();

    if(password !== confirmPassword) {
      return alert(password === confirmPassword);
      // return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email, 
      name, 
      password,
    }
    
    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success) {
          navigate('/login');
        }else{
          alert('회원가입 실패!');
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
        
        <label>Name</label>
        <input type="name" value={name} onChange={onNameHandler} />
        
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>Password Confirm</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        
        <button>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage