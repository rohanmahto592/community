import React from 'react'

const Divider = ({value}) => {
  return (
    <div class="relative py-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full  border-b border-gray-300"></div>
        </div>
        <div class="relative   flex justify-center">
          <span
            style={{ fontFamily: "comic sans ms",fontSize:'2vh' }}
            class="bg-gray-600 rounded-full px-4  text-sky-500"
          >
           {value}
          
          </span>
         
        </div>
      </div>
  )
}

export default Divider