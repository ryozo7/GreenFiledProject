import React from 'react'
import "../../style/common/common.css"
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'

const History = (props) => {
  const {histories,setEditId,setIsCreate,setCurrentData} = props;
  const navigate = useNavigate()
  const changeTime = (num) => {
    if(num === 0) return "朝"
    if(num === 1) return "昼"
    if(num === 2) return "晩"
    return "エラー"
  }
  const changeTimeMedicine = (num) => {
    if(num === 0) return "medicine_morning"
    if(num === 1) return "medicine_afternoon"
    if(num === 2) return "medicine_night"
    return "エラー"
  }
  const takeMedicine = (take) => {
    if(take) return "⚪︎"
    return "×"
  }
  const changeDate = (str) => {
    const splitStr = str.split("-")
    return `${splitStr[1]}/${splitStr[2]}`
  }
  const changedHistories = histories.map((elem) => {
    const tableData = {}
    tableData.data_id = elem.data_id
    tableData.date = `${changeDate(elem.date)}_${changeTime(elem.time)}`
    tableData.name = `${elem.user_lastName} ${elem.user_firstName}`
    tableData.temp = elem.temp.toFixed(1)
    tableData.defecation = elem.defecation
    tableData.eat = elem.eat
    tableData.medicine = takeMedicine(elem[changeTimeMedicine(elem.time)])
    tableData.condition = elem.condition
    return tableData
  })
  const getDataId = (id) => {
    console.log("id : ",id)
    setIsCreate(false)
    setEditId(id)
    const arrayIndex = histories.findIndex(elem => elem.data_id === id)
    const tmpData = {
      inputDate : histories[arrayIndex].date,
      isMorning : histories[arrayIndex].medicine_morning,
      isAfternoon : histories[arrayIndex].medicine_afternoon,
      isEvening : histories[arrayIndex].medicine_night,
      temp :histories[arrayIndex].temp,
      defecation :histories[arrayIndex].defecation,
      eat :histories[arrayIndex].eat,
      isMedicine :histories[arrayIndex].medicine_morning || histories[arrayIndex].medicine_afternoon || histories[arrayIndex].medicine_night,
      condition : histories[arrayIndex].condition,
    }
    setCurrentData(tmpData)
    navigate("/patient/modifyhistory")

  }
  const createHandler = () => {
    setIsCreate(true)
    navigate("/patient/newhistory")
  }

  
  return (
    <div>
      <div className='common__histories--wrap'>
        <div className='common__histories--btn'>
          <button onClick={createHandler}>+ 新規登録</button>
        </div>
        <div className='common__histories--btn'>
          <button>処方箋登録</button>
        </div>        
      </div>
      <div className='common__histories--tableWrap'>
      <table border="1">
      <tbody>
        <tr>
          <th width = "100">ID </th>
          <th width = "100">日付</th>
          <th width = "100">名前</th>
          <th width = "100">体温[℃]</th>
          <th width = "100">便</th>
          <th width = "100">食欲</th>
          <th width = "100">薬の服用</th>
          <th width = "150">症状</th>
          <th></th>
        </tr>
        {changedHistories.map((elem) => {
          return (
            <tr key={elem.data_id} className='common__histories--table'>
              <td>{elem.data_id}</td>
              <td>{elem.date}</td>
              <td>{elem.name}</td>
              <td>{elem.temp}</td>
              <td>{elem.defecation}</td>
              <td>{elem.eat}</td>
              <td>{elem.medicine}</td>
              <td style={{textAlign: "left"}}>{elem.condition}</td>
              <td><EditIcon onClick={()=>{getDataId(elem.data_id)}}/></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default History
