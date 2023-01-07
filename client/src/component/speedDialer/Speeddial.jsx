
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {TiClipboard} from 'react-icons/ti'
import {BsFileImage} from 'react-icons/bs'
import {FaVideo} from 'react-icons/fa'
import {BsPatchQuestionFill} from 'react-icons/bs'
import {BsBroadcastPin} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import { TiHome } from 'react-icons/ti';
import {RiBroadcastFill} from 'react-icons/ri'
const actions = [
    { icon: < TiHome  style={{color:'slateblue',fontSize:'3vh'}} />, name: 'Home',link:'/' },
  { icon: <BsPatchQuestionFill style={{color:'slateblue',fontSize:'3vh'}} />, name: 'Post Doubt',link:'/doubt' },
  { icon: <TiClipboard style={{color:'slateblue',fontSize:'3vh'}}/>, name: 'Post Article',link:'/create-article' },
  { icon: <FaVideo style={{color:'slateblue',fontSize:'3vh'}} />, name: 'Post Video shots',link:'/upload-video' },
  { icon: <BsFileImage style={{color:'slateblue',fontSize:'3vh'}} />, name: 'Post trendy Images',link:'/create-images' },
  { icon: <RiBroadcastFill style={{color:'slateblue',fontSize:'3vh'}} />, name: 'Broadcast Message',link:'/broadcast-message' },
];
const Speeddial = () => {
    const navigate=useNavigate()
  return (
    <SpeedDial
    ariaLabel="SpeedDial basic example"
    sx={{ position: 'absolute', bottom: 16, right: 16 }}
    icon={<SpeedDialIcon />}
  >
    {actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={()=>navigate(action.link)}
      />
    ))}
  </SpeedDial>
  )
}

export default Speeddial