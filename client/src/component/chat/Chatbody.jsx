import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './homestyle.css'
import { Typography } from '@mui/material';
import moment from 'moment'
import { Chip } from '@mui/material';
const Chatbody = ({messages,lastMessageRef,typingStatus}) => {
    const navigate = useNavigate();
   
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload()
  };
  return (
    <>
    
    <header className="chat__mainHeader">
        <p>Chat Room</p>
    <Button style={{color:'whitesmoke',fontFamily:'comic sans ms',border:'1px solid whitesmoke'}} variant="outlined" onClick={handleLeaveChat}>Leave chat</Button>
    </header>
   
    <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender" >
              <Chip  style={{ fontFamily:'comic sans ms',color:'whitesmoke',fontWeight:'bold',width:'15vh',margin:'auto'}} label={moment(new Date(message.date)).fromNow()} />
              <Typography variant="body">{message.text}</Typography>
              </div>
            </div>
          ) : (
            <div key={message.id}>
              <p style={{color:'whitesmoke',paddingBottom:'1vh',fontFamily:'comic sans ms'}}>{message.name}</p>
              <div className="message__recipient ">
              <Chip  style={{ fontFamily:'comic sans ms',color:'whitesmoke',fontWeight:'bold',width:'15vh',margin:'auto'}} label={moment(new Date(message.date)).fromNow()} />
                <p>{message.text}</p> 
              </div>
              
            </div>
          )
        )}
        <div className="message__status">
        <p >{typingStatus}....</p>
        </div>
        <div ref={lastMessageRef} />
      </div> 

   
    </>
  )
}

export default Chatbody