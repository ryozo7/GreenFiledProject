import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import historyApi from '../../api/historyApi'
import DeleteIcon from '@mui/icons-material/Delete';

const InputPatient = (props) => {
  const {username,editId, setHistories, isCreate, histories, currentData} = props
  const navigate = useNavigate()


  console.log("今のisCreate : ",isCreate)
  //state
  const [inputDate, setInputDate]=useState(currentData.inputData)
  const [isMorning,setIsMorning]=useState(currentData.isMorning)
  const [isAfternoon,setIsAfternoon]=useState(currentData.isAfternoon)
  const [isEvening,setIsEvening]=useState(currentData.isEvening)
  const [temp, setTemp] = useState(currentData.temp)
  const [defecation, setDefecation] = useState(currentData.defecation)
  const [eat, setEat] = useState(currentData.eat)
  const [isMedicine, setIsMedicine] = useState(currentData.isMedicine)
  const [condition, setCondition] = useState(currentData.condition)

  
  //helper
  const timeHelper = ()=>{
    if (isMorning) return 0
    if (isAfternoon) return 1
    if (isEvening) return 2
    return null
  }
  const medicineHelper = ()=>{
    if (isMorning) return "medicine_morning"
    if (isAfternoon) return 'medicine_afternoon'
    if (isEvening) return 'medicine_night'
  }
  // const timeChangeToString = (num) => {
  //   if(num === 0) setIsMorning(true)
  //   if(num === 1) setIsAfternoon(true)
  //   if(num === 2) setIsEvening(true)
  // }
  // const checkMedicineHistory = (num,morning,afternoon,night) => {
  //   if(num === 0 && morning) setIsMedicine(true)
  //   if(num === 1 && afternoon) setIsMedicine(true)
  //   if(num === 2 && night) setIsMedicine(true)
  // }
  
  // if(!isCreate){
  //   const arrayIndex = histories.findIndex(elem => elem.data_id === editId)
  //   setInputDate(histories[arrayIndex].date)
  //   setTemp(histories[arrayIndex].temp)
  //   setDefecation(histories[arrayIndex].defecation)
  //   setEat(histories[arrayIndex].eat)
  //   setCondition(histories[arrayIndex].condition)
  //   timeChangeToString(histories[arrayIndex].time)
  //   checkMedicineHistory(histories[arrayIndex].time,histories[arrayIndex].medicine_morning,histories[arrayIndex].medicine_afternoon,histories[arrayIndex].medicine_night)
  // }
  


  //onChangeいっぱい
  const changeDate = (e)=> {
    const currentDate = e.target.value
    setInputDate(currentDate)
    // console.log(("currentDate : ", inputDate))
  }
  const checkMornig = (e)=> {
    const status = e.target.checked
    setIsMorning(status)
    // console.log("isMorning : ",isMorning)
  }
  const checkAfternoon = (e)=> {
    const status = e.target.checked
    setIsAfternoon(status)
    // console.log("isAfternoon : ",isAfternoon)
  }
  const checkEvening = (e)=> {
    const status = e.target.checked
    setIsEvening(status)
    // console.log("isEvening : ",isEvening)
  }
  const changeTemp = (e)=> {
    const indexNum = e.target.selectedIndex
    const currentTemp = e.target.options[indexNum].label
    setTemp(currentTemp)
    // console.log("currentTemp : ",temp)
  }
  const changeDefecation = (e)=>{
    const indexNum = e.target.selectedIndex
    const currentDefecation = e.target.options[indexNum].label
    setDefecation(currentDefecation)
    // console.log("currentDefecation : ",defecation)
  }
  const changeEat = (e)=>{
    const indexNum = e.target.selectedIndex
    const currentEat = e.target.options[indexNum].label
    setEat(currentEat)
    // console.log("currentEat : ",eat)
  }
  const checkMedicine = (e)=> {
    const status = e.target.checked
    setIsMedicine(status)
    // console.log("isMedicine : ",isMedicine)
  }
  const changeCondition = (e)=> {
    const currentCondition = e.target.value
    setCondition(currentCondition)
    // console.log("isCondition : ",condition)
  }



  //クリック後の動き
  const postClickHandler = async() => {
    // console.log("post処理実行後、PatientTopへ移動")
    if(isCreate){
      const sendData = {}
      sendData.date = inputDate
      sendData.time = timeHelper()
      if (temp) sendData.temp = temp
      if (defecation) sendData.defecation = defecation
      if (eat) sendData.eat = eat
      if (isMedicine) sendData[medicineHelper()] = true
      if (condition) sendData.condition = condition
  
      console.log("username : ",username)
      try {
        const response = await historyApi.createHistory(username,sendData)
        console.log(response)
        try{
          const getData = await historyApi.getByUser(username)
          setHistories(getData.data)
          navigate("/patient/histories")
        }catch(error){console.log("error :",error)}
      }catch(err){console.log(`err : ${err}`)}
    }else{
      const sendData = {}
      if(currentData.inputDate != inputDate) sendData.date = inputDate
      if(currentData.time != timeHelper()) sendData.time = timeHelper()
      if (currentData.temp != temp) sendData.temp = temp
      if (currentData.defecation != defecation) sendData.defecation = defecation
      if (currentData.eat != eat) sendData.eat = eat
      if(currentData.time != timeHelper()){
        if(timeHelper() === 1 || timeHelper() === 2) sendData.medicine_morning = false
        if(timeHelper() === 0 && isMedicine) sendData.medicine_morning = true
        if(timeHelper() === 0 || timeHelper() === 2) sendData.medicine_afternoon = false
        if(timeHelper() === 1 && isMedicine) sendData.medicine_afternoon = true
        if(timeHelper() === 0 || timeHelper() === 1) sendData.medicine_night = false
        if(timeHelper() === 2 && isMedicine) sendData.medicine_night = true
      }
      if (currentData.condition != condition) sendData.condition = condition
  
      console.log("username : ",username)
      try {
        const response = await historyApi.updateHistory(editId,sendData)
        console.log("putの後:",response)
        try{
          const updateHistory = await historyApi.getByUser(username)
          setHistories(updateHistory.data)
          navigate("/patient/histories")
        }catch(error){console.error("error :",error)}
      }catch(err){console.log(`err : ${err}`)}
    }

    //新規登録用のApiをたたきに行く
  }

  const cancelClickHandler = () => {
    ///patient/historiesへ戻る

    navigate("/patient/histories")
  }
  const deleteClickHandler = async()=>{
    try{
      const response = await historyApi.deleteHistory(editId)
      try{
        const getByUserHistory = await historyApi.getByUser(username)
        await setHistories(getByUserHistory.data)
        navigate("/patient/histories")
      }catch(err){console.error(`err : ${err}`)}
    }catch(err){console.error(`err : ${err}`)}
  }

  return (
    <div>
      <div>
        <label htmlFor="" >日付 : </label>
        <input type="date" onChange={changeDate} value ={inputDate || currentData.inputDate}/>
      </div>
      <div>
        <label htmlFor="">時間帯 : </label>
        <input type="checkbox" value="0" onChange={checkMornig} checked = {isMorning}/>
        <label htmlFor="">朝</label>
        <input type="checkbox" value="1" onChange={checkAfternoon} checked = {isAfternoon}/>
        <label htmlFor="">昼</label>
        <input type="checkbox" value="2" onChange={checkEvening} checked = {isEvening}/>
        <label htmlFor="">晩</label>
      </div>
      <div>
        <label htmlFor="">体温: </label>
        <select name="" id="" onChange={changeTemp} value = {temp || String(currentData.temp)}>
          <option value=""></option>
          <option value="36.5" >36.5</option>
          <option value="37.0" >37.0</option>
          <option value="37.2" >37.2</option>
          <option value="37.5" >37.5</option>
          <option value="38.2" >38.2</option>
          <option value="40.2" >40.2</option>
        </select>
      </div>
      <div>
        <label htmlFor="">便: </label>
        <select name="" id="" onChange={changeDefecation} value = {defecation || String(currentData.defecation)}>
          <option value=""></option>
          <option value="普通">普通</option>
          <option value="便あり">便あり</option>
          <option value="便なし">便なし</option>
          <option value="軟便">軟便</option>
          <option value="下痢">下痢</option>
        </select>
      </div>
      <div>
        <label htmlFor="">食欲: </label>
        <select name="" id="" onChange={changeEat} value = {eat || String(currentData.eat)}>
          <option value=""></option>
          <option value="いつもと同じ">いつもと同じ</option>
          <option value="食欲あり">食欲あり</option>
          <option value="7割">7割</option>
          <option value="5割">5割</option>
        </select>
      </div>
      <div>
        <label htmlFor="">薬 : </label>
        <input type="checkbox" onChange={checkMedicine} checked ={isMedicine} />
        <label htmlFor="">服用した</label>
 
      </div>
      <div>
        <label htmlFor="">症状 : </label>
        <input type="text" onChange={changeCondition} value={condition}/>
      </div>
      <button onClick={postClickHandler}>登録</button>
      <button onClick={cancelClickHandler}>キャンセル</button>
      <DeleteIcon onClick={deleteClickHandler}/>
    </div>
  )
}

export default InputPatient
