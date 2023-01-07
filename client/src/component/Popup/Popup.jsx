import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
const Popup = ({user,open,setOpen}) => {
    const[about,setabout]=useState('')
    const[github,setgithub]=useState('')
    const[linkedln,setlinkedln]=useState('')
    const[twitter,setTwitter]=useState('')
    const[leetcode,setleetcode]=useState('')
    const[gfg,setgfg]=useState('')
    const[codeforces,setcodeforces]=useState('')
    const[codechef,setcodechef]=useState('')

      const handleClose = () => {
        setOpen(false);
      };
      
      const Submitdetails= ()=>{
        const id=user?._id;
        if(about.length>0)
        {
          axios.put(`http://localhost:3001/users/about/${id}`,{data:about}).then((response)=>{
    
          })
        }
        if(github.length>0)
        {
           axios.put(`http://localhost:3001/users/github/${id}`,{data:github}).then((response)=>{
    
          })
        }
        if(linkedln.length>0)
        {
           axios.put(`http://localhost:3001/users/linkd/${id}`,{data:linkedln}).then((response)=>{
    
          })
        }
        if(twitter.length>0)
        {
          axios.put(`http://localhost:3001/users/twitter/${id}`,{data:twitter}).then((response)=>{
    
          })
        }
        if(leetcode.length>0)
        {
          axios.put(`http://localhost:3001/users/leetcode/${id}`,{data:leetcode}).then((response)=>{
    
          })
        }
        if(gfg.length>0)
        {
          axios.put(`http://localhost:3001/users/gfg/${id}`,{data:gfg}).then((response)=>{
    
          })
        }
        if(codeforces.length>0)
        {
          axios.put(`http://localhost:3001/users/codeforces/${id}`,{data:codeforces}).then((response)=>{
    
          })
        }
        if(codechef.length>0)
        {
          axios.put(`http://localhost:3001/users/codechef/${id}`,{data:codechef}).then((response)=>{
    
          })
        }
        setTimeout(() => {
          handleClose()
        }, 1000);
        
    
      }
  return (
    <Dialog open={open} onClose={handleClose}>

        
    <DialogContent>
      <DialogContentText sx={{fontFamily:'comic sans ms',fontWeight:'bold',fontSize:'2vh',textAlign:'center'}}>
      <Avatar sx={{marginBottom:'5px'}} alt="P" src={user.imageUrl} referrerPolicy="no-referrer"/>
        Add your Personal Details
      </DialogContentText>
      <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Tell us about Yourself"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setabout(e.target.value)}
      />
      <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Github"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setgithub(e.target.value)}
      />
      <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Linkedln"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setlinkedln(e.target.value)}
      />
       <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Twitter"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setTwitter(e.target.value)}
      />
       <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Leetcode"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setleetcode(e.target.value)}
      />
      <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="GeeksforGeeks"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setgfg(e.target.value)}
      />
       <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="Codeforces"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setcodeforces(e.target.value)}
      />
      <TextField
      sx={{fontFamily:'comic sans ms'}}
        autoFocus
        margin="dense"
        id="name"
        label="CodeChef"
        type=""
        fullWidth
        variant="outlined"
        onChange={(e)=>setcodechef(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={Submitdetails}>Submit</Button>
    </DialogActions>
  </Dialog>
  )
}

export default Popup