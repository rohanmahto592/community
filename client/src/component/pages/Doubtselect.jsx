import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Doubtselect({options,title,setcategory}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    setAge(event.target.value);
    setcategory(event.target.value)
  };

  return (
    <Box sx={{ width:'14vh',float:'left', display:'inline', position:'relative',right:0, height:'1vh' }}>
      <FormControl fullWidth>
        <InputLabel sx={{color:'white',fontWeight:'bolder',fontFamily:'comic sans ms'}} id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label=""
          onChange={handleChange}
          sx={{color:'whitesmoke',fontFamily:'comic sans ms',fontWeight:'bold'}}
        >
        {
            options.map((item)=>(
                <MenuItem value={item.value}>{item.name}</MenuItem>
            ))
        }
        </Select>
      </FormControl>
    </Box>
  );
}
