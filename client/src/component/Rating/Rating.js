import React,{useState} from 'react'
import { FaStar } from "react-icons/fa";
import { Container, Radio, Ratings } from "./Ratingstyle";
import axios from 'axios'
const Rating = ({id,loginId,rate,setRate}) => {
    const  submitRating=(givenrating)=>{
      let check=window.confirm(`are you sure you want to give ${givenrating} star rating to the profile`)
      if(check===true)
      {
        const value=parseInt(givenrating)
        axios.put(`http://localhost:3001/users/rating/${id}/${value}`).then((response)=>{
          window.location.reload()
        })
      }
    }
  return (
    <>
    <Container>
    {[...Array(5)].map((item, index) => {
      const givenRating = index + 1;
      return (
        <label>
          <Radio
            type="radio"
            value={givenRating}
            onClick={() => {
              setRate(givenRating);
              setTimeout(()=>{
                submitRating(givenRating)
              },1000)
             
            }}
          />
          <Ratings>
            <FaStar
              color={
                givenRating < rate || givenRating === rate
                  ? "rgb(51,105,255)"
                  : "rgb(255,255,255)"
              }
            />
          </Ratings>
         
        </label>
      );
    })}
   
  </Container>
   <p style={{textAlign:'center',fontFamily:'comic sans ms'}} className='text-sky-500 text-sm'>Rate profile on the basis of content</p>
   </>
  )
}

export default Rating