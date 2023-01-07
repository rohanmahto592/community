import React,{useState,useEffect} from 'react'
import CardHeader from "@mui/material/CardHeader";
import ImageLists from "./ImageLists";
import {Avatar}from '@mui/material'
import comment from "../../assests/icons/comment.png";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "../Feed/Divider";
import upvote from "../../assests/icons/upvote.png";
import Tooltip from "@mui/material/Tooltip";
import like from "../../assests/icons/like.png";
import { useNavigate } from "react-router-dom";
import save from '../../assests/icons/save.webp'
import axios from 'axios'
import moment from 'moment'
import { RiChatVoiceFill } from 'react-icons/ri';
import Alertmessage from '../Alert/Alertmessage';
import Rendering from './RenderingRating/Rendering';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button } from '@mui/material';
const Articlepin = ({user,pin,check,socket}) => {
  
    const navigate=useNavigate()
    const [check1,setcheck1]=useState(false)
    const [check2,setcheck2]=useState(false)
    const [open,setOpen]=useState(false)
   
    const increaseVote=()=>{
        
            const id = pin._id;
            const likeid = user?._id;
           
            
            let p = false;
            for (let z = 0; z < pin.upvote?.length; z++) {
              if (pin.upvote[z] === likeid) {
                p = true;
                break;
              }
            }
            if (p === false) {
              axios
                .put(`http://localhost:3001/posts/article/update/vote/${id}/${likeid}`)
                .then((response) => {
                  window.location.assign('/')
                });
            }
            else
            {
              setcheck1(true)
              setOpen(true)
            }
          

    }
    const Likes=()=>{
        const id = pin._id;
    const likeid = user._id;
    let p = false;
    for (let z = 0; z < pin.likes?.length; z++) {
      if (pin.likes[z] === likeid) {
        p = true;
        break;
      }
    }
    if (p === false) {
    axios
      .put(`http://localhost:3001/posts/article/update/like/${id}/${likeid}`)
      .then((response) => {
        window.location.assign('/')
      });
    }
    else
    {
      setcheck2(true)
      setOpen(true)
    }

    }
    const deleteitem=(id)=>{
        axios
        .delete(`http://localhost:3001/posts/article/${id}`)
        .then((response) => {
          axios.put(`http://localhost:3001/users/removemany/${id}`).then((response)=>{
            
          })
        });
    }
    const removeitem=(id,userid)=>{
      axios.put(`http://localhost:3001/users/removepin/${id}/${userid}`).then((response)=>{
        window.location.reload()
      })
    }
    const savePin=(pinId)=>{
        console.log(pinId)
        const id=user?._id;
        axios.put(`http://localhost:3001/users/savepin/${id}/${pinId}`).then((response)=>{

        })

    }
  return (
    <>
    
    <div class="max-w-sm m-1 p-6 bg-white border-2 border-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <Rendering rating={pin?.created_by?.rating}/>
    {check1===true && <Alertmessage open={open} setOpen={setOpen} setcheck={setcheck1} type="warning" message={`Already upvoted the ${pin.created_by.userName.slice(0,-11)}'s Article post`}/>}
    {check2===true && <Alertmessage open={open} setOpen={setOpen} setcheck={setcheck2} type="warning" message={`Already liked the ${pin.created_by.userName.slice(0,-11)}'s Article post`}/>}
        <CardHeader
        sx={{
          color: "whitesmoke",
          fontFamily: "comic sans ms",
          fontWeight: "bold",
        }}
        avatar={
          <Avatar
            onClick={() => navigate(`/user-profile/${pin?.created_by?._id}`)}
            src={pin?.created_by_image}
            referrerPolicy="no-referrer"
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        title={
          <Typography
            className="text-sky-500"
            sx={{ fontFamily: "comic sans ms" }}
          >
            {pin?.created_by?.userName?.slice(0,-11)}
          </Typography>
        }
        subheader={
          <Typography
            className="text-gray-300"
            sx={{ fontFamily: "comic sans ms" ,fontSize:'1.5vh'}}
          >
            {pin?.created_by?.about}
          </Typography>
        }
        
      />
      {pin?.Address?.length>0 &&  <Chip  style={{fontFamily:'comic sans ms',color:'slateblue',fontWeight:'bold',marginBottom:'6px'}} label='Link' onClick={()=>window.location.assign(pin.Address)} />}
   
      {pin?.title && (
        <h5 style={{fontFamily:'comic sans ms'}} class="mb-2 mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {pin.title}
        </h5>
      )}

      {pin?.text && (
        <p class="mb-3  font-normal text-sm text-gray-700 dark:text-gray-400">
          {pin.text}
        </p>
      )}
     {pin?.pdf &&(
         <a href={pin?.pdf} rel="noreferrer" target='_blank' download="pdf">
         <button
            
             type="button"
             style={{fontFamily:'comic sans ms'}}
             class="py-2.5 px-5 mr-2 mb-2 text-sm text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-violet-500 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
           >
             Download PDF
           </button>
           </a>

     )} 
       
       <Stack sx={{ justifyContent: "center",marginTop:'3vh' }} direction="row" spacing={0.5}>
      
       <Chip
            sx={{
              color: "whitesmoke",
              fontWeight: "bold",
              fontFamily: "comic sans ms",
            }}
            onClick={() => navigate(`/articlepin-detail/${pin?._id}`)}
            avatar={<Avatar alt="Natacha" src={comment} />}
            label={pin?.comment_info?.length>0?pin.comment_info.length:0}
           
          />
      
        
          <Chip
            sx={{
              color: "whitesmoke",
              fontWeight: "bold",
              fontFamily: "comic sans ms",
            }}
            onClick={increaseVote}
            avatar={<Avatar alt="Natacha" src={upvote} />}
            label={pin?.upvote?.length > 0 ? pin?.upvote?.length : 0}
            
          />
        
        
         
       
        
       {check!=='True' && 
          pin?.created_by?._id === user?._id ? (
            <Chip
            onClick={() => deleteitem(pin?._id)}
              sx={{ color: "whitesmoke" }}
              icon={<AiOutlineDelete sx={{ color: "white" }} />}
              label="Bin"
             
            />
          ) : null
          
        } 
        {check==='True' && (<Chip
            onClick={() => removeitem(pin?._id,user?._id)}
              sx={{ color: "whitesmoke" }}
              icon={<AiOutlineDelete sx={{ color: "white" }} />}
              label="remove pin"
             
            />)}
       {check!=='True' &&( <div onClick={()=>savePin(pin?._id)}>
        <Avatar alt="Natacha" src={save}/>
        </div> )} 
        
      </Stack>
      <Chip  style={{ fontFamily:'comic sans ms',color:'whitesmoke',fontWeight:'bold',marginBottom:'1vh',marginTop:'1vh',marginLeft:'35%',}} label={moment(new Date(pin.Date)).fromNow()} />


        </div>
        </>
  )
}

export default Articlepin