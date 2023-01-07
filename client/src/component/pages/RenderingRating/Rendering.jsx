import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio } from "./ratingStyles";

const Rendering = ({ rating }) => {
  console.log(rating);
  const [sum, setsum] = useState(0);
  let value = 0;
  useEffect(() => {
    rating?.length > 0 &&
      rating?.map((item) => {
        value += parseInt(item);
      });

    rating.length > 0 && setsum(Math.ceil(value / rating.length));
  }, [rating]);

  return (
    <Container>
      {sum > 0 &&
        [...Array(sum)].map((item, index) => {
          return (
            <label>
             

              <FaStar color={"rgb(51,105,255)"} />
            </label>
          );
        })}
    </Container>
  );
};

export default Rendering;
