import React, { useState } from "react";
import Doubtpage from "../pages/Doubtpage";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import Doubtselect from "../pages/Doubtselect";
import Chip from "@mui/material/Chip";
import Articlepage from '../pages/Articlepage'
import Videopage from "../pages/Videopage";
import Imagepage from "../pages/Imagepage/Imagepage";
const Feed = ({ user,socket }) => {
  const { categoryId } = useParams();
  const [pins, setpins] = useState(null);
  const {pinId}=useParams()
  return (
    <div class="max-w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700">
     
    
      <Doubtpage user={user && user} socket={socket} />
      <Articlepage user={user && user} pinId={pinId && pinId}/>
      <Videopage user={user && user} pinId={pinId && pinId}/>
      <Imagepage user={user && user} pinId={pinId && pinId}/>
      
    </div>
  );
};

export default Feed;
