import React from 'react'
import { useState,useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Search from '../Search/Search'
import Doubt from '../Doubt/Doubt'
import Feed from '../Feed/Feed'
import Pindetails2 from '../pindetails/Pindetails2'
import ImagePindetails from '../pindetails/ImagePindetails'
import Article from '../createArticle/Article'
import Addimages from '../AddImages/Addimages'
import Addvideo from '../Addvideo/Addvideo'
import Pindetails from '../pindetails/Pindetails'
import Popup from '../Popup/Popup'
import socketIO from 'socket.io-client';
import Chat from '../chat/Chat'
const socket = socketIO.connect('http://localhost:3001');
const Pins = ({user}) => {
 
    const [searchitem,setsearchitem]=useState('')

   
   
      return (
    <div className='px-2 md:px-5'>

        <div style={{backgroundColor:'#31708E'}}  className='bg-gray-50'>
            <Navbar searchitem={searchitem} setsearchitem={setsearchitem} user={user&& user}/>
           
            
        </div>
        <div className='h-full'>
            <Routes>
            <Route  path="/pin-detail/:pinId" exact element={<Pindetails user={user && user}/>}/>
            <Route  path="/articlepin-detail/:pinId" exact element={<Pindetails2 user={user && user}/>}/> 
            <Route  path="/imagepin-detail/:pinId" exact element={<ImagePindetails user={user && user}/>}/>   
            <Route path="/create-article" exact element={<Article user={user && user}  />} />
            <Route path="/create-images" exact element={<Addimages user={user && user}  />} />
            <Route path="/upload-video" exact element={<Addvideo user={user && user}  />} />
            <Route path="/doubt" exact element={<Doubt user={user && user}  />} />
            <Route  path='/*' exact element={<Feed user={user&&user} socket={socket}/>}/> 
            <Route  path="/category/:pinId" exact element={<Feed user={user && user}/>}/>
            <Route path='/broadcast-message'  exact element={<Popup user={user && user}/>}/>
            <Route  path="/search" element={<Search search={searchitem} setsearchitem={setsearchitem} user={user && user} />}/>
            <Route path="/chatroom" element={<Chat socket={socket} user={user && user} />}/> 
            
            </Routes>

        </div>
    </div>
  )
}

export default Pins