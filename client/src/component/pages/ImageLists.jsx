import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
const ImageLists = ({itemData}) => {
  return (
    <Box sx={{ borderRadius:'1vh', display:'flex',marginBottom:'15px',maxHeight:300,maxWidth:320, overflowY: 'scroll' }}>
    <ImageList style={{objectFit:'cover'}} variant="masonry"  cols={1} gap={5}>
    {itemData?.map((item) => (
      <ImageListItem key={item}>
        <img
          src={`${item}?w=248&fit=crop&auto=format`}
          srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item?.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
  </Box>
 
  )
}

export default ImageLists