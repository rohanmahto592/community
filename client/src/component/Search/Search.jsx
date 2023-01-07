import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinnerdetail from "../Spinner2/Spinnerdetail";
import Divider from '../Feed/Divider'
import Masonry from 'react-masonry-css'
import Articlepin from '../pages/Articlepin'
import sorry from '../../assests/background/sorry.webp'
const Search = ({ search,user }) => {
  const [item,setitem]=useState([])
  const [loading, setloading] = useState(true);
  const categories = ['Android', 'C','C++','Java', 'Javascript', 'Python', 'C#', 'Css', 'Web Dev', 'Machine Learning', 'Artifical Intelligence', 'Data Structures','Algorithms', 'Computer Network', 'OOPS','Database','bitcoin', 'Frontend', 'others'];
const getsearchItem=()=>{
    if( search.length>0)
    {
        
        
    axios.get(`http://localhost:3001/posts/article/searchitem/${search}`).then((response)=>{
        console.log(response.data);
        if(response.data=='false')
        {
            setitem([])
        }
        else
        {
            setitem(response.data)
        setloading(false)
        }
        
    })
    axios.get(`http://localhost:3001/posts/article/searchname/${search}`).then((response)=>{
        setitem(response.data)
    })
    }
}
  useEffect(() => {
    setTimeout(()=>{
        getsearchItem();
    },500)
    
  }, [search]);
  const breakpointobj={
    default:4,
    3000:6,
    2000:3,
    1200:3,
    1000:2,
    500:1
}

  return(
    <div>
       
        {loading? <Spinnerdetail message={`Searching ${search}`} />:<>
        <Divider value={search}/>
       
        
        {item.length>0?<Masonry  className='flex  animate-slide-fwd' breakpointCols={breakpointobj}>
        {item?.map((pin)=><Articlepin user={user && user} key={pin._id} pin={pin}/>)}
        </Masonry>
        :<div style={{display:'flex',margin:'auto',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <img style={{width:'35vh',height:'35vh'}} src={sorry} />
        <p style={{fontFamily:'comic sans ms'}} className="text-violet-500 text-lg"><b>No pin Found,try searching different </b></p>
        </div>}
    
    </>
    }
        
    </div>


  )
};

export default Search;
