import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RendingPage from "./components/views/RendingPage/RendingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Auth from "./hoc/auth";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Auth(RendingPage, null)} >
          {/* <Route path="dashboard" element={<Dashboard />}> */}
            <Route path="login" element={Auth(LoginPage, false)} />
            <Route path="register" element={Auth(RegisterPage, false)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}