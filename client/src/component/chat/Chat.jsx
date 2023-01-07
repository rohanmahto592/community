import React,{useEffect,useState,useRef} from 'react'
import Chatbar from './Chatbar'
import Chatbody from './Chatbody'
import Chatfooter from './Chatfooter'
import Alertmessage from '../Alert/Alertmessage'
const Chat = ({socket,user}) => {
    let userName=user?.userName;
    console.log(socket)

    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);
    const [typingStatus, setTypingStatus] = useState('');
    const[connectedName,setconnectedName]=useState('');
    const [open,setOpen]=useState(false);
    const[check,setcheck]=useState(false)
    const[name,setname]=useState('')
    useEffect(()=>{
        setname(localStorage.getItem('userName'));
        setOpen(true);
        setcheck(true);
    },[])
    useEffect(() => {
        localStorage.setItem('userName', userName);
        socket.emit('newUser', { userName, socketID: socket.id });
       
       },[])
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
      }, [socket, messages]);
      useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
      useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));

      }, [socket]);
      useEffect(() => {
        socket.on('user connected', (data) =>{
         setconnectedName(data.username)
         
        });
        
      }, []);
      useEffect(() => {
        
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
  return (
    <div 
         style={{margin:'auto'}} className='w-4/5' >
    {check===true &&  <Alertmessage message={`${connectedName} joinned the chat`} open={open} setOpen={setOpen} setcheck={setcheck}/>}
      <Chatbar socket={socket}/>
      <div className="chat__main">
        <Chatbody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus}  />
        <Chatfooter socket={socket} />
      </div>
    </div>
  )
}

export default Chat