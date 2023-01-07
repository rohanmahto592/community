import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import Doubtpin from './Doubtpin'
import Doubtselect from './Doubtselect'
import Divider from '../Feed/Divider'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Spinnerdetail from '../Spinner2/Spinnerdetail'
import bg2 from '../../assests/background/bg2.svg'
import { Chip } from '@mui/material'
import {RiChatVoiceFill} from 'react-icons/ri'
const Doubtpage = ({user,socket}) => {
   
    const [doubts,setdoubts]=useState(null)
    const [category,setcategory]=useState("");
    const navigate=useNavigate()
    const [loading,setloading]=useState(true);
    const[users,setUsers]=useState([])
    useEffect(() => {
      socket.on('newUserResponse', (data) =>{
       setUsers(data)});
    }, [socket, users]);
    useEffect(()=>{
        if(category.length===0)
        {
            

         axios.get('http://localhost:3001/posts/doubt').then((response)=>{
            setdoubts(response.data)
            setloading(false)  
            
        })
        }
        else
        {
            console.log(typeof(category))
            axios.get(`http://localhost:3001/posts/doubt/categories/${category}`).then((response)=>{
                setdoubts(response.data);
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
    
    const doubt=[{name:'unresolved',value:'unresolved'},{name:'resolved',value:'resolved'},{name:'Recent',value:'Date'},{name:'upvote',value:'upvote'}]
  return (
    <>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',justifyItems:'flex-end'}}>
    <Chip
            onClick={() =>navigate('/chatroom')}
            sx={{ color:'slateblue',float:'right', position:'relative',right:0,fontWeight:'bold',fontFamily:'comic sans ms' }}
              
              label="Chat Support 🔥"
             
    /><br/>
    <Doubtselect title="Doubt" options={doubt} setcategory={setcategory}/><br/><br/>
    </div>
    <Divider value='Doubts'/>
   {doubts?.length===0 &&
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px',flexDirection:'column'}}>
       <img style={{width:'15vh',height:'15vh'}} src={bg2} alt="bg2"/>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className=' pt-3 text-lg text-white'>Create your first doubt</p>
       <p style={{fontFamily:'comic sans ms',textAlign:'center'}} className=' text-md text-sky-600'><b>get the conversation going....</b></p>
       <Button onClick={()=>navigate('/doubt')} style={{color:'white',fontFamily:'comic sans ms',marginTop:'3vh'}} variant="outlined">Post Doubt</Button>
    </div>} 
  {loading?<Spinnerdetail message={`Loading doubts !!`}/>:<Masonry  className='flex  animate-slide-fwd'  breakpointCols={breakpointobj}>
       {doubts && (doubts?.map((pin)=><Doubtpin user={user && user} key={pin?._id} pin={pin && pin}/>))}
   </Masonry>}
   
   
   </>
   
  )
}

export default Doubtpage