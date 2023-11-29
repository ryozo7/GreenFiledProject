import React from 'react'
import {Outlet} from "react-router-dom"
import "../../style/patient/patientTop.css"

const Header = () => {
  return (
    <div>
      {/* <div className="wrap">
        <div className='dummy'></div>
        <div className='content1'>1234</div>
        <div className='content2'>abcd</div>
      </div> */}
      <header className='patient__header'>Parenting👶</header>
      {/* <header>
        <div>dummy</div>
        <div>aParenting👶</div>
        <div>
          <div>
          <label htmlFor="">username</label>
          </div>
          <div>
            <input type="image" src="" alt="" />
          </div>
          <div>
            logoutIcon
          </div>
        </div>
      </header> */}
      <Outlet />
    </div>
  )
}

export default Header
