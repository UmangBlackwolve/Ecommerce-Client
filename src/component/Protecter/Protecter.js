import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
const Protecter = ({Component}) => {
    const navigen = useNavigate()
    const params = useParams();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token)
        {
            navigen('/login')
        }
        
    },[])
  return (

    <div>
        <Component/>
      
    </div>
  )
}

export default Protecter