import React,{useState,useEffect} from 'react'
import './homestyle.css'
const Chatbar = ({socket}) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        socket.on('newUserResponse', (data) =>{
        console.log(data)
         setUsers(data)});
      }, [socket, users]);
   
  return (
    <div className="chat__sidebar">
    <div>
      <p className='text-sky-500 text-lg'>Active users</p>
      <div className="chat__users">
        {users.length>0 && users?.map((user) => (
          <p key={user.socketID}>{user?.userName}🔥</p>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Chatbar