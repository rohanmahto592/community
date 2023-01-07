import React,{useState,useEffect} from 'react'
import Divider from '../Feed/Divider'
import Masonry from 'react-masonry-css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Articlepin from './Articlepin'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import bg3 from '../../assests/background/bg3.svg'
const Articlepage = ({user, pinId,socket}) => {
    const [articles,setarticles]=useState(null)
    const [loading,setloading]=useState(true)
   const navigate=useNavigate()
    let ID='Articles'
    if(pinId)
    {
        ID=`${pinId} Articles`;
    }
   
 
    useEffect(()=>{
        if(pinId)
        {
            axios.get(`http://localhost:3001/posts/article/${pinId}`).then((response)=>{
                setarticles(response.data)
                setloading(false)
                
            })
            

        
        }
        else
        {
            axios.get('http://localhost:3001/posts/article').then((response)=>{
                setarticles(response.data)
                
               setloading(false)
            })
        }
        
    },[pinId])
    const breakpointobj={
        default:4,
        3000:6,
        2000:3,
        1200:3,
        1000:2,
        500:1
    }
    const doubt=[{name:'upvote',value:'upvote'},{name:'likes',value:'likes'},{name:'Recent',value:'Date'}]
  return (
    <>
    <Divider value={ID}/>
   {articles?.length===0 && <div style={{justifyContent:'center',alignItems:'center',padding:'10px',display:'flex',flexDirection:'column'}}>
       <img src={bg3} alt="bg3"/>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className=' pt-3 text-md text-white'> Create your first article...</p>
       


       <Button onClick={()=>navigate('/create-article')} style={{color:'white',fontFamily:'comic sans ms',marginTop:'3vh'}} variant="outlined">Post Article</Button>
    </div>} 
   {loading?<Spinner message={`Loading Articles !!`}/>: <Masonry  className='flex  animate-slide-fwd' breakpointCols={breakpointobj}>
       {articles && (articles?.map((pin)=><Articlepin user={user && user} key={pin._id} pin={pin} socket={socket}/>))}
   </Masonry>}
   </>
    
  )
}

export default Articlepage