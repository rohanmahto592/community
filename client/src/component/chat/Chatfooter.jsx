import React,{useState} from 'react'
import './homestyle.css'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
const Chatfooter = ({socket}) => {
    const [message, setMessage] = useState('');
    const handleTyping = () =>{
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
    }
    const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        date:Date.now(),
        id: `${socket.id}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div>
    <TextField style={{color:'white',backgroundColor:'whitesmoke', width:'100%',outline:'none',border:'none'}} onKeyDown={handleTyping} onChange={(e)=>setMessage(e.target.value)} variant='filled' label="Type your message"/>
    <Button  style={{marginTop:'2vh',color:'white',border:'1px solid whitesmoke',fontFamily:'sans-serif'}} variant="outlined"  onClick={handleSendMessage}>Send 👇️</Button>
    </div>
  )
}

export default Chatfooter