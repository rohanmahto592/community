const express=require('express');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express();
const http = require('http').Server(app);
const cors=require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let users = [];

socketIO.on('connection', (socket) => {
  socket.on('message', (data) => {
      console.log(data)
    socketIO.emit('messageResponse', data);
  });
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    socket.broadcast.emit("user connected", { 
        username: data?.userName,
      });
    let check=true;
    for(let i=0;i<users?.length;i++)
    {
        if(users[i].userName===data?.userName)
        {
            check=false;
            break;
        }
    }
    
    if(check===true &&  data?.userName?.length>0)
    {
        
        users.push(data);
    }
   
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected',socket);

    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse',users);
    socket.disconnect();
  });
});

dotenv.config()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LoginRouter=require('./Routers/loginRouter.js')
const articleRouter=require('./Routers/ArticleRouter')
const imageRouter=require('./Routers/imageRouter')
const videoRouter=require('./Routers/videoRouter')
const doubtRouter=require('./Routers/doubtRouter')
app.use('/users',LoginRouter)
app.use('/posts/article',articleRouter)
app.use('/posts/images',imageRouter)
app.use('/posts/videos',videoRouter)
app.use('/posts/doubt',doubtRouter)

mongoose.connect(process.env.mongoose_uri).then(
    http.listen('3001',()=>console.log('listening at 3001'))
)






