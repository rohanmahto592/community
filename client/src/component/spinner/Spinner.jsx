import React from 'react'
import { Dna } from 'react-loader-spinner';
const Spinner = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Dna
            visible={true}
            height={100}
            width={300}
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            className="m-5"
          />
    
          <p style={{fontFamily:'comic sans ms'}} className="text-xl text-violet-500 text-center px-2">{message}</p>
        </div>
      );
}

export default Spinner