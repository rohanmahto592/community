import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
// import { BubblyLink as Link } from 'react-bubbly-transitions'
import {IoMdAddCircle} from 'react-icons/io'
import {ImSearch} from 'react-icons/im'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import Popup from '../Popup/Popup'
const Navbar = ({searchitem,setsearchitem,user}) => {
    const navigate=useNavigate()
    
   const [open,setOpen]=useState(false)
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    
  
    if(user)
    {
        return (
            <div  className='flex bg-sky-700 gap-2 md:gap-5 w-full mt-2 pb-2'>
                <div  className='flex bg-sky-600  justify-start mt-2 ml-3 items-center w-full px-2 rounded-lg   outline-none focus-within:shadow-sm '>
                    <ImSearch fontSize={21} className='m-2 text-white '/>
                    <input
                    type="text"
                    onChange={(e)=>setsearchitem(e.target.value)}
                    placeholder='Search article by tags and username'
                    value={searchitem}
                     onFocus={()=>navigate('/search')}
                     style={{fontFamily:'comic sans ms'}}
                    className='p-2 w-full bg-white outline-none'
                    />
                </div>
                <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <Avatar src={user.imageUrl} referrerPolicy="no-referrer" alt="user-pic" className="mt-2" />
          </Link>
          <Link to="/create-pin" className="  text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAddCircle onClick={handleClickOpen} className='text-white mt-1 mr-3 w-8 h-8' />
          </Link>
          <Popup open={open} setOpen={setOpen} user={user && user}/>
        </div>
            </div>
          )

    }
    return null;
    
  
}

export default Navbar
