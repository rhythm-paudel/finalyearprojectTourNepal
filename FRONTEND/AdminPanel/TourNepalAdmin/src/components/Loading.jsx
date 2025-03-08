import React from 'react'

function Loading({message}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin">
    
    </div>
  
    <div>  {message}... Please Wait</div>
  </div>
  )
}

export default Loading
