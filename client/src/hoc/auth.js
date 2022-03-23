import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  // null,  => 아무나 출입이 가능한 페이지
  // ture,  => 로그인한 유저만 출입이 가능한 페이지
  // false, => 로그인한 유저는 출업이 불가능한 페이지

  // return <SpecificComponent />
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then(res => {
        // 로그인 하지 않은 상태
        if(!res.payload.isAuth) {
          if(option) {
            navigate('/login');
          }   
        } else {
          // 로그인 한 상태
          if(adminRoute && !res.payload.isAdmin) {
            navigate('/');
          }else{
            if(!option) {
              navigate('/');
            }
          }

        }
      }).catch((e) => {
        console.log(e)
      })

    }, [])

    return <SpecificComponent />
  }

  return <AuthenticationCheck />
}