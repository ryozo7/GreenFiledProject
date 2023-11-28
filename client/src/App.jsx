import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Top from './component/Top'
import AuthTop from './component/auth/AuthTop'
import Login from './component/auth/Login'
import SignUp from './component/auth/SignUp'
import PatientTop from "./component/patient/PatientTop"
import History from "./component/common/History"
import InputPatient from "./component/patient/InputPatient"
import DoctorTop from "./component/doctor/DoctorTop"
import InputDoctor from "./component/doctor/InputDoctor"


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/auth" element={<AuthTop />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Route>
      <Route path="/patient" element={<PatientTop />}>
        <Route path="/patient/histories" element={<History />} />
        <Route path="/patient/newhistory" element={<InputPatient />} />
        <Route path="/patient/modifyhistory" element={<InputPatient />} />
      </Route>
      <Route path="/doctor" element={<DoctorTop />}>
        <Route path="/doctor/histories" element={<History />} />
        <Route path="/doctor/medicine" element={<InputDoctor />} />
      </Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
