import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-3xl font-semibold absolute top-0 left-0 ">
      <AiOutlineLoading3Quarters
        className="text-black text-5xl animate-spin duration-1000"
      />
    </div>
  )
}

export default Loading
