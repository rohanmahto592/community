import {Routes,Route} from 'react-router-dom'
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import React,{useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
function App() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/");
    }
   
  },[])
  return (
    <>
    
    <Routes>
      <Route path="/login" element={<Login />}/>

      <Route path="/*" element={<Home />} />
    </Routes>
  </>
  );
}

export default App;
