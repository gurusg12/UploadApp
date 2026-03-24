import React, { useState } from 'react'

const Demo = () => {
  const[data , setdata] = useState([])
  const [inputs , setinputs] = useState({title : "" , desc : "" , info : []})

  const handle =  (e)=>{
    const File = e.target.files[0]
    const info = {file : File , preview : URL.createObjectURL(File)}
    setinputs((prev)=>{
      return{
      ...prev , info:[...prev.info,info]
    }})
  }
  return (
    <div>
      
    </div>
  )
}

export default Demo
