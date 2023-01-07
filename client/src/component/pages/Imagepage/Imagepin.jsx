import React,{useState} from 'react'
import CardHeader from "@mui/material/CardHeader";
import { Stack,Chip,Avatar } from '@mui/material';
import Typography from "@mui/material/Typography";
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import ImageLists from '../ImageLists';
import comment from '../../../assests/icons/comment.png'
import upvote from '../../../assests/icons/upvote.png'
import like from '../../../assests/icons/like.png'
import Rendering from '../RenderingRating/Rendering';
import axios from 'axios'
import Alertmessage from '../../Alert/Alertmessage';
const Imagepin = ({pin,user}) => {
    const [check,setcheck]=useState(false)
  const [check2,setcheck2]=useState(false)
  const [open,setOpen]=useState(false)
    const navigate=useNavigate()

    const increaseVote=()=>{
        const id = pin?._id;
    const likeid = user?._id;
    console.log(likeid);
    let p = false;
    for (let z = 0; z < pin?.upvote?.length; z++) {
      if (pin.upvote[z] === likeid) {
        p = true;
        break;
      }
    }
    if (p === false) {
      axios
        .put(`http://localhost:3001/posts/images/update/vote/${id}/${likeid}`)
        .then((response) => {});
    }
    else
    {
      setcheck2(true)
      setOpen(true)
    }
    }
    const Likes=()=>{


    }
    const deletepin=(id)=>{
        axios
      .delete(`http://localhost:3001/posts/images/${id}`)
      .then((response) => {});
    }
  return (
    <div class="max-w-sm p-6 bg-white m-1 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        {check===true && <Alertmessage open={open} setcheck={setcheck} setOpen={setOpen} type="warning" message={`Already like the ${pin?.created_by?.userName.slice(0,-11)}'s Image post`}/>}
    {check2===true && <Alertmessage open={open} setcheck={setcheck2} setOpen={setOpen} type="warning" message={`Already upvoted the ${pin?.created_by?.userName.slice(0,-11)}'s Image post`}/>}
        <Rendering rating={pin?.created_by?.rating}/>

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
            {pin?.created_by?.userName.slice(0,-11)}
          </Typography>
        }
        subheader={
          <Typography
            className="text-gray-300"
            sx={{ fontFamily: "comic sans ms",fontSize:'1.5vh' }}
          >
            {pin?.created_by?.about}
          </Typography>
        }
      />
      {pin?.title && (
        <h5 style={{fontFamily:'comic sans ms'}} class="mb-2 mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {pin?.title}
      </h5>
      )}

      {pin?.text && (
        <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          {pin?.text}
        </p>
      )}
      {pin?.images?.length > 0 ? <ImageLists itemData={pin?.images} /> : null}
      <Stack sx={{ justifyContent: "center",marginTop:'3vh' }} direction="row" spacing={0.5}>
      
          <Chip
            sx={{
              color: "whitesmoke",
              fontWeight: "bold",
              fontFamily: "comic sans ms",
            }}
            onClick={() => navigate(`/imagepin-detail/${pin?._id}`)}
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
            label={pin?.upvote?.length > 0 ? pin.upvote.length : 0}
            
          />
     
          {pin?.created_by?._id === user?._id ? (
            <Chip
              onClick={() => deletepin(pin?._id)}
              sx={{ color: "whitesmoke" }}
              icon={<AiOutlineDelete  sx={{ color: "white" }} />}
              label="Bin"
              
            />
          ) : null}
       
      </Stack>
      <Chip  style={{fontFamily:'comic sans ms',color:'whitesmoke',fontWeight:'bold',marginBottom:'1vh',marginTop:'1vh',marginLeft:'30%'}} label={moment(new Date(pin.created_At
)).fromNow()} />
    </div>
  )
}

export default Imagepin