import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Top = () => {
    const navigate = useNavigate()
    const clickHndlar = () => {
        console.log("クリックイベント")
        navigate("/tmp")
    }
    useEffect(() => {
        navigate("/tmp")
    },[])
    
  return (
    <div>
      Top
      <button onClick = {clickHndlar}>click me!</button>
      <Outlet />
    </div>
  )
}

export default Top
