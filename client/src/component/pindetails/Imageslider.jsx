import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
const Imageslider = ({images}) => {
    console.log(images)
  return (
    <Box sx={{ marginBottom:'15px',maxHeight:450,maxWidth:450, overflowY: 'scroll' }}>
    <ImageList style={{objectFit:'cover'}} variant="masonry"  cols={1} gap={5}>
    {images.map((item) => (
      <ImageListItem key={item}>
        <img
          src={`${item}?w=248&fit=crop&auto=format`}
          srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
  </Box>
  )
}

export default Imageslider