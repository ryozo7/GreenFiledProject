import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Top from './component/Top'
import AuthTop from './component/auth/AuthTop'
import Login from './component/auth/Login'
import SignUp from './component/auth/SignUp'
import Header from "./component/common/Header"
import History from "./component/common/History"
import InputPatient from "./component/patient/InputPatient"
import InputDoctor from "./component/doctor/InputDoctor"
import { userInfo } from './test/user'
import { historiesTest } from './test/histories'
import { useState } from 'react'


function App() {
  const [username,setUsername] = useState(userInfo.username)
  const [image,setImage] = useState(userInfo.image)
  const [roll,setRoll] = useState(userInfo.roll)
  const [histories,setHistories] = useState(historiesTest)
  const [editId,setEditId] = useState()
  const [isCreate,setIsCreate] = useState(true)
  const [currentData,setCurrentData] = useState({})

  
  




  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top setHistories={setHistories} username={username} roll={roll}/>} />
      <Route path="/auth" element={<AuthTop />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Route>
      <Route path="/patient" element={<Header />}>
        <Route path="/patient/histories" element={<History histories={histories} setEditId={setEditId} setIsCreate={setIsCreate} setCurrentData={setCurrentData} />} />
        <Route path="/patient/newhistory" element={<InputPatient username={username} setHistories={setHistories} isCreate={isCreate} histories={histories} currentData={currentData} />} />
        <Route path="/patient/modifyhistory" element={<InputPatient username={username} editId={editId} setHistories={setHistories} isCreate={isCreate} histories={histories} currentData={currentData} />} />
      </Route>
      <Route path="/doctor" element={<Header />}>
        <Route path="/doctor/histories" element={<History  histories={histories} />} />
        <Route path="/doctor/medicine" element={<InputDoctor />} />
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
