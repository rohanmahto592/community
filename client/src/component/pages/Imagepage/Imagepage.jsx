import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Divider from '../../Feed/Divider'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../spinner/Spinner'
import Masonry from 'react-masonry-css'
import Imagepin from './Imagepin'
import bg from '../../../assests/background/empty.svg'
const Imagepage = ({user}) => {
    
    const[imagepin,setImagepin]=useState([])
    const[loading,setloading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/images`).then((response)=>{
            setImagepin(response.data)
            setloading(false)
            
        })

    },[])
    const breakpointobj={
        default:4,
        3000:6,
        2000:3,
        1200:3,
        1000:2,
        500:1
    }
  return (
    <>
    <   Divider value="Images" />
    {imagepin.length===0 && <div style={{justifyContent:'center',alignItems:'center',padding:'10px',display:'flex',flexDirection:'column'}}>
      <img src={bg} alt="background"/>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className='pr-5 text-lg text-white'> Create the first post</p>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className='text-md text-sky-600'><b>Get the conversation going....</b></p>
       <Button onClick={()=>navigate('/create-images')} style={{color:'white',fontFamily:'comic sans ms',marginTop:'2vh'}} variant="outlined">Post Images</Button>
    </div>} 
    {loading?<Spinner message={`Loading Articles !!`}/>:<Masonry  className='flex  animate-slide-fwd' breakpointCols={breakpointobj}>
       {imagepin.length>0 && (imagepin?.map((pin)=><Imagepin user={user && user} key={pin._id} pin={pin}/>))}
   </Masonry>}
    </>
  )
}

export default Imagepage