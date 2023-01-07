import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Imageslider from "./Imageslider";
import moment from 'moment'
import {Chip} from '@mui/material'
import Alertmessage from "../Alert/Alertmessage";
import Spinnerdetail from "../Spinner2/Spinnerdetail";
const Pindetails2 = ({ user }) => {
  const { pinId } = useParams();
  const [doubt, setdoubt] = useState();
  const [comment,setComment]=useState('')
  const [pdf,setpdf]=useState(null)
  const [loading,setloading]=useState(true)
  const[wrongfile,setwrongfile]=useState(false)
  const[file,setfile]=useState(null)
  const [open,setOpen]=useState(false)
  const [check,setcheck]=useState(false)
  const links=[]
  useEffect(() => {
    const id = pinId;
    axios.get(`http://localhost:3001/posts/article/single/${id}`).then((response) => {
    
      setdoubt(response.data);
      setloading(false)
     
      
    });
    
    

  }, []);
  const files=(e)=>{
      console.log(e.target.files[0])
      if (e.target.files[0].type === "application/pdf") {
        setwrongfile(false);
        var file = e.target.files[0];
        console.log(file);
        setfile(file);
      } else {
        setwrongfile(true);
      }
      
  }
  
  
  const addComment=async()=>{
    if (file) {
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("cloud_name", "gcet");
      formdata.append("upload_preset", "pdf_Files");
      await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
        method: "post",
        mode: "cors",
        body: formdata,
      }).then(async (res) => {
        let json = await res.json();
        links.push(json.secure_url);
      });
    }
    const data={
      pdf:links[0],
      comment_info:{
        comment:comment,
        Date:Date.now()},
      created_by:{
        name:user.userName,
        id:user._id,
        imageurl:user.imageUrl
      }
    }
    const id = pinId;
    axios.put(`http://localhost:3001/posts/article/${id}`,data).then((response)=>{
      setcheck(true)
      setOpen(true)
     
    })

  }
  return (
    <>
    {check && <Alertmessage open={open} setOpen={setOpen} message="commented successfully" type='info'/>}
      {loading?<Spinnerdetail message={`Loading comments !!`}/>:  doubt && (
        <div
          className="flex xl:flex-row mt-8 flex-col m-auto bg-white"
          style={{  maxWidth: "1500px" }}
        >
         
         <div className=" bg-gray-800 w-full p-5 flex-1 xl:min-w-620">

         <div className="flex items-center justify-between">

        </div>
        <Link to={`/user-profile/${doubt?.created_by?._id}`} className="flex gap-2 mt-2 items-center bg-gray-800 rounded-lg ">
              <img src={doubt?.created_by_image} className="w-11 h-11 rounded-full" alt="user-profile" />
             
            </Link>
            <Chip  style={{fontFamily:'comic sans ms',color:'slateblue',fontWeight:'bold',marginBottom:'1vh',marginTop:'1vh',}} label={`Article posted ${moment(new Date(doubt.Date)).fromNow()}`} />
        <div class=" max-w-full p-6 bg-white  rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h1 style={{fontFamily:'comic sans ms'}} className="text-xl text-white font-bold break-words mt-3">
                {doubt.title}
              </h1>
              
              <p style={{fontFamily:'comic sans ms'}} className="mt-4 text-md text-gray-100 break-words ">{doubt.text}</p>
             
        </div>
        
            <h2 style={{fontFamily:'comic sans ms'}} className="mt-5 text-white text-2xl">Comments</h2>
            <div className="h-64 bg-gray-800 overflow-y-auto">
           
            <ol class="relative border-lg border-violet-200 dark:border-sky-700">
              {
                doubt?.comment_info?.map((item)=>(
                  <li class="mb-10 ml-6 mt-3">
                  <Link to={`/user-profile/${item?.created_by?.id}`} >
        <span class="flex absolute left-4 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-600 dark:bg-sky-900">
            <img class="rounded-full shadow-lg" src={item?.created_by?.imageurl} alt="Thomas Lean image"/>
        </span>
        </Link>
        <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <div class="justify-between items-center mb-3 sm:flex">
                <div class="text-sm mt-2 ml-5 font-normal text-gray-500 lex dark:text-gray-300">{item.created_by.name} commented <span style={{fontFamily:'comic sans ms'}} className="text-violet-500 text-md">{moment(new Date(item.comment_info?.Date)).fromNow()}</span></div>
                {item?.pdf?.length>0 &&(<a href={item?.pdf} download="pdf">
                <time style={{fontFamily:'comic sans ms'}} class="mb-1 ml-8 text-xs font-normal text-sky-500 sm:order-last sm:mb-0">Download PDF</time>
                </a>)}
            </div>
            
            <div class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">{item?.comment_info?.comment}</div>
        </div>
        
    </li>
                ))
              }   

                 
            </ol> 
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
         <Link to={`/user-profile/${user._id}`}>
        <img src={user.imageUrl} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
        </Link>
        <input
                className=" bg-gray-100  border-gray-800 outline-none border-2 p-2 rounded-md focus:border-gray-300 lg:flex-1 "
                type="text"
                placeholder="Add a comment"
                value={comment}
                style={{fontFamily:'comic sans ms'}}
                onChange={(e) => setComment(e.target.value)}
              />
            <input
                className=" bg-gray-100  border-gray-800 outline-none border-2 p-2 rounded-md focus:border-gray-300 lg:flex-1 "
                type="file"
                
                value={pdf}
                style={{fontFamily:'comic sans ms'}}
                onChange={files}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >Done</button>
         </div>
         </div>
         
          
        </div>
      )}
    </>
  );
};

export default Pindetails2;
