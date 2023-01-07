import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alertmessage = ({open,setOpen,message,type,setcheck}) => {
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setcheck(false)
      };
  return (
    <Snackbar  anchorOrigin={{ vertical:'top', horizontal:'center'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
         {message}
        </Alert>
    </Snackbar>
  )
}

export default Alertmessage