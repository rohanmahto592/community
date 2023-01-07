import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import { gapi } from "gapi-script";
import { useEffect } from 'react'
import logo from '../../assests/background/astrocat.webp'
import background from '../../assests/background/hex.jpg'
import axios from 'axios'
import Alertmessage from '../Alert/Alertmessage';
const Login = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [college,setcollege]=React.useState(false)
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId:process.env.REACT_APP_CLINET_ID,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);
      const responseGoogle =  (response) => {
        
        
        
       
        const education=response.profileObj.email.slice(response.profileObj.email.length-3);
        if(education==='edu')
        {
          const {name,googleId,imageUrl,email}=response.profileObj;
          const data={
            userName:name,
            googleId:googleId,
            Email:email,
            imageUrl:imageUrl
        }
        //console.log(body)
        localStorage.setItem('user',JSON.stringify(response.profileObj))
        axios.post('http://localhost:3001/users',data).then((response)=>{
            navigate('/',{ replace: true })
        })

        }
        else
        {
          setOpen(true)
          setcollege(true)
          navigate('/login')
        }
        

          
        
      }
  return (
    <>
   {college && <Alertmessage open={open} setOpen={setOpen} type='error' message="You are not authorized, please login with college Email Id"/>} 
    <div className='flex justify-start items-center flex-col h-screen' >
        <div className='relative w-full h-full'>
            <div
            style={{background:`url(${background})`,backgroundSize: 'cover',
            backgroundRepeat:'no-repeat'}}
            
            
            className='w-full h-full'

            />
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <h3 className='text-white' style={{fontSize:'4vh',fontWeight:'bolder',fontFamily:'monospace',textAlign:'center'}}>Let's build a <span className='text-sky-500'style={{fontSize:'4.5vh'}}>Community</span></h3>
                <div className='p-5'>
                    <img src={logo} width="250px" alt='logo'/>
                </div>
                <div className='shadow-2xl'>
                <GoogleLogin
                    clientId='697453383933-sfr5bfpfmvhv6nsd979kee3tjeqhaauk.apps.googleusercontent.com'
                    render={renderProps => (
                    <button
                    type="button"
                    
                    className='bg-sky-700 text-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none '
                     onClick={renderProps.onClick} 
                     disabled={renderProps.disabled}
                     >
                    <FcGoogle  className='mr-4 '/>Sign in with Google</button>
                    
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                </div>

            </div>

        </div>
    </div>
    </>
  )
}

export default Login