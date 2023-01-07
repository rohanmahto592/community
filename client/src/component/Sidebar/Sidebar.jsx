import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { BubblyLink } from 'react-bubbly-transitions';

import {categories} from './categories'
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-300 hover:text-violet-500 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col text-white justify-between  h-full overflow-y-scroll min-w-800 hide-scrollbar bg-gray-50  dark:bg-gray-800" >
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
         
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 style={{fontFamily:'comic sans ms'}} className="mt-2 px-5 text-sky-600 lg: 4xl md:text-xl">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
            style={{fontFamily:'comic sans ms'}}
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-9 h-9 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-sky-600 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user?.imageUrl} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full" alt="user-profile" />
          <p style={{fontFamily:'comic sans ms'}}>{user.userName.slice(0,-11)}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}

export default Sidebar