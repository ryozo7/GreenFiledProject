import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import historyApi from '../../api/historyApi'

const InputPatient = (props) => {
  const {username} = props
  const navigate = useNavigate()

  //state
  const [inputDate, setInputDate]=useState()
  const [isMorning,setIsMorning]=useState(false)
  const [isAfternoon,setIsAfternoon]=useState(false)
  const [isEvening,setIsEvening]=useState(false)
  const [temp, setTemp] = useState()
  const [defecation, setDefecation] = useState()
  const [eat, setEat] = useState()
  const [isMedicine, setIsMedicine] = useState(false)
  const [condition, setCondition] = useState("")

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
    console.log("post処理実行後、PatientTopへ移動")
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
      navigate("/patient/histories")

    }catch(err){console.log(`err : ${err}`)}

    //新規登録用のApiをたたきに行く
  }

  const cancelClickHandler = () => {
    ///patient/historiesへ戻る
    navigate("/patient/histories")
  }

  return (
    <div>
      <div>
        <label htmlFor="" >日付 : </label>
        <input type="date" onChange={changeDate}/>
      </div>
      <div>
        <label htmlFor="">時間帯 : </label>
        <input type="checkbox" value="0" onChange={checkMornig}/>
        <label htmlFor="">朝</label>
        <input type="checkbox" value="1" onChange={checkAfternoon}/>
        <label htmlFor="">昼</label>
        <input type="checkbox" value="2" onChange={checkEvening}/>
        <label htmlFor="">晩</label>
      </div>
      <div>
        <label htmlFor="">体温: </label>
        <select name="" id="" onChange={changeTemp}>
          <option value=""></option>
          <option value="">36.5</option>
          <option value="">37.0</option>
          <option value="">37.5</option>
        </select>
      </div>
      <div>
        <label htmlFor="">便: </label>
        <select name="" id="" onChange={changeDefecation}>
          <option value=""></option>
          <option value="">普通</option>
          <option value="">軟便</option>
          <option value="">下痢</option>
        </select>
      </div>
      <div>
        <label htmlFor="">食欲: </label>
        <select name="" id="" onChange={changeEat}>
          <option value=""></option>
          <option value="">いつもと同じ</option>
          <option value="">7割</option>
          <option value="">5割</option>
        </select>
      </div>
      <div>
        <label htmlFor="">薬 : </label>
        <input type="checkbox" onChange={checkMedicine}/>
        <label htmlFor="">服用した</label>
 
      </div>
      <div>
        <label htmlFor="">症状 : </label>
        <input type="text" onChange={changeCondition} value={condition}/>
      </div>
      <button onClick={postClickHandler}>登録</button>
      <button onClick={cancelClickHandler}>キャンセル</button>
    </div>
  )
}

export default InputPatient
