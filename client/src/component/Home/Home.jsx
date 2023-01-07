import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import {AiFillCloseCircle} from 'react-icons/ai'
import { HashLink as Link } from 'react-router-hash-link'
import {HiMenu} from 'react-icons/hi'
import {Route,Routes} from 'react-router-dom'
import Pins from '../Pins/Pins'
import { Notifications } from 'react-push-notification';
import Userprofile from "../Userprofile/Userprofile";
import Speeddial from "../speedDialer/Speeddial";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const id = userInfo.googleId;
  //console.log(id)
  useEffect(() => {
    axios.get(`http://localhost:3001/users/current/${id}`).then((response) => {
      setUser(response.data);
     //console.log(response.data)
    });
  }, []);
  useEffect(() => {
      scrollRef.current.scrollTo(0, 0);
    });
  return (
    <>
    <Notifications />
      <div className="flex bg-gray-700 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
         <Sidebar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.imageUrl} alt="user-pic" className="w-11 h-11 rounded-full "/>
          </Link>
          </div>
          {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} user={user && user} />
         
        </div>
        )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" exact element={<Userprofile user={user && user} />} />
          <Route path="/*"  exact element={<Pins user={user && user} />} />
        </Routes>
      </div>
      
      </div>
      <Speeddial/>
    </>
  );
};

export default Home;
