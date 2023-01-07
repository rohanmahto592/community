import React,{useEffect, useState} from 'react'
import Masonry from 'react-masonry-css'
import Divider from "../Feed/Divider";
import Videopin from './Videopin'
import axios from 'axios'
import Doubtselect from './Doubtselect';
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Spinnerdetail from '../Spinner2/Spinnerdetail';
import background from '../../assests/background/empty.svg'
const Videopage = ({user,pinId}) => {
    const [videos,setvideos]=useState(null)
    const [category,setcategory]=useState()
    const [loading,setloading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        if(pinId)
        {
            const category=pinId
            axios.get(`http://localhost:3001/posts/videos/category/${category}`).then((response)=>{
                setvideos(response.data)
               setloading(false)
            })
        }
        else
        {
        axios.get('http://localhost:3001/posts/videos').then((response)=>{
            setvideos(response.data)
           
            setloading(false)
        })
    }

    },[category])
    const breakpointobj={
        default:4,
        3000:6,
        2000:3,
        1200:3,
        1000:2,
        500:1
    }
    const doubt=[{name:'upvote',value:'upvote'},{name:'Recent',value:'Date'}]
  return (
      <>
     <br/>
      <Doubtselect title="videos" setcategory={setcategory} options={doubt}/><br/><br/>
       <Divider value='Daily Shots'/>
       {videos?.length===0 && <div style={{justifyContent:'center',alignItems:'center',padding:'10px',display:'flex',flexDirection:'column'}}>
           <img src={background} alt="images"/>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className='pr-5 text-md text-sky-500'> Contribute to the community by adding a Video Shots...</p><br/>
       <Button onClick={()=>navigate('/upload-video')} style={{color:'white',fontFamily:'comic sans ms'}} variant="outlined">Post Shots</Button>
    </div>} 
     {loading?<Spinnerdetail message={`Loading video shots !!`}/>:  <Masonry  className='flex  animate-slide-fwd' breakpointCols={breakpointobj}>
       {videos && (videos?.map((pin)=><Videopin user={user && user} key={pin._id} pin={pin}/>))}
       </Masonry>}
      </>
  )
}

export default Videopage