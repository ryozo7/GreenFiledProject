import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import historyApi from '../api/historyApi'

const Top = (props) => {
  const {setHistories, username, roll} = props
    const navigate = useNavigate()

    useEffect(()=>{
      const inilize = async () => {
        try{
          if(roll){
            const res = await historyApi.getAll()
            console.log("resの中身 :",res)
            setHistories(res.data);
            navigate("/doctor/histories")
          }else{
            const res = await historyApi.getByUser(username)
            console.log("resの中身 :",res)
            setHistories(res.data);
            navigate("/patient/histories")
          }
        }catch(error){console.error("error : ",error)}
      }
      inilize();
    },[])
    
  return (
    <div>
    </div>
  )
}

export default Top
