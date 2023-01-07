import React,{useState} from 'react'
import CardHeader from "@mui/material/CardHeader";
import ImageLists from "./ImageLists";
import comment from "../../assests/icons/comment.png";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "../Feed/Divider";
import upvote from "../../assests/icons/upvote.png";
import Tooltip from "@mui/material/Tooltip";
import like from "../../assests/icons/like.png";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios'
import save from '../../assests/icons/save.webp'
import Paper from '@mui/material/Paper';
import moment from 'moment'
import Alertmessage from '../Alert/Alertmessage';
import Rendering from './RenderingRating/Rendering';
const Videopin = ({user,pin,check}) => {
    const navigate=useNavigate()
    const [check1,setcheck1]=useState(false)
    const [check2,setcheck2]=useState(false)
    const [open,setOpen]=useState(false)
    const increaseVote=()=>{
        const id = pin._id;
            const likeid = user?._id;
            console.log(likeid);
            let p = false;
            for (let z = 0; z < pin.upvote?.length; z++) {
              if (pin.upvote[z] === likeid) {
                p = true;
                break;
              }
            }
            if (p === false) {
              axios
                .put(`http://localhost:3001/posts/videos/update/vote/${id}/${likeid}`)
                .then((response) => {});
            }
            else
            {
              setcheck2(true)
              setOpen(true)
            }

    }
    const Likes=()=>{
        const id = pin._id;
        const likeid = user._id;
        let p = false;
        for (let z = 0; z < pin.likes.length; z++) {
          if (pin.likes[z] === likeid) {
            p = true;
            break;
          }
        }
        if (p === false) {
        axios
          .put(`http://localhost:3001/posts/videos/update/like/${id}/${likeid}`)
          .then((response) => {});
        }
        else
        {
          setcheck1(true)
          setOpen(true)
        }
    }
    const deleteitem=(id)=>{
        axios
        .delete(`http://localhost:3001/posts/videos/${id}`)
        .then((response) => {
          
            axios.put(`http://localhost:3001/users/removemany/${id}`).then((response)=>{
              
            })
        });
    }
    const savePin=(pinId)=>{
        console.log(pinId)
        const id=user?._id;
        axios.put(`http://localhost:3001/users/savepin/${id}/${pinId}`).then((response)=>{

        })

    }
    const removeitem=(id,userid)=>{
      axios.put(`http://localhost:3001/users/removepin/${id}/${userid}`).then((response)=>{
        window.location.reload()
      })
    }
  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
       <Rendering rating={pin?.created_by?.rating}/>
       {check===true && <Alertmessage open={open} setcheck={setcheck1} setOpen={setOpen} type="warning" message={`Already like the ${pin.created_by.userName.slice(0,-11)}'s Video post`}/>}
    {check2===true && <Alertmessage open={open} setcheck={setcheck2} setOpen={setOpen} type="warning" message={`Already upvoted the ${pin.created_by.userName.slice(0,-11)}'s Video post`}/>}
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
            {pin.created_by?.userName.slice(0,-11)}
          </Typography>
        }
        subheader={
          <Typography
            className="text-gray-300"
            sx={{ fontFamily: "comic sans ms",fontSize:'1.5vh' }}
          >
            {pin.created_by?.about}
          </Typography>
        }
      />
      
      {pin?.title && (
        <h5 style={{fontFamily:'comic sans ms'}} class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {pin.title}
        </h5>
      )}

      {pin?.text && (
        <p style={{fontFamily:'sans-serif'}} class="mb-3  font-normal text-gray-700 dark:text-gray-400">
          {pin.text}
        </p>
      )}
     {pin?.video &&(
         <video class="w-full max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" controls>
         <source src={pin.video} type="video/mp4"/>
         Your browser does not support the video tag.
       </video>

     )} 
       <Stack sx={{ justifyContent: "center",marginTop:'3vh' }} direction="row" spacing={0.5}>
       {pin?.pdf && <Chip  style={{fontFamily:'comic sans ms',color:'slateblue',fontWeight:'bold',marginBottom:'6px'}} label=' PDF' onClick={()=>window.location.assign(pin.pdf)} />}
       {pin?.Address && <Chip  style={{fontFamily:'comic sans ms',color:'slateblue',fontWeight:'bold',marginBottom:'6px'}} label='Link' onClick={()=>window.location.assign(pin.Address)} />}
          <Chip
            sx={{
              color: "whitesmoke",
              fontWeight: "bold",
              fontFamily: "comic sans ms",
            }}
            onClick={increaseVote}
            avatar={<Avatar alt="Natacha" src={upvote} />}
            label={pin?.upvote?.length > 0 ? pin.upvote.length : 0}
           
          />
        
        {check!=='True' && (
        <Avatar alt="Natacha" src={save} onClick={()=>savePin(pin?._id)} />
        )} 
       {check!=='True' && 
          pin?.created_by?._id === user?._id ? (
            <Chip
            onClick={() => deleteitem(pin?._id)}
              sx={{ color: "whitesmoke" }}
              icon={<AiTwotoneDelete sx={{ color: "white" }} />}
              label="Bin"
              
            />
          ) : null
        }
        {check==='True' && (
            <Chip
            onClick={() => removeitem(pin?._id,user?._id)}
              sx={{ color: "whitesmoke" }}
              icon={<AiTwotoneDelete sx={{ color: "white" }} />}
              label="remove"
              
            />
          )
        }
        
       
      </Stack>
      <Chip  style={{fontFamily:'comic sans ms',color:'whitesmoke',fontWeight:'bold',marginBottom:'1vh',marginTop:'1vh',marginLeft:'35%',}} label={moment(new Date(pin.created_At)).fromNow()} />
        </div>
  )
}

export default Videopin