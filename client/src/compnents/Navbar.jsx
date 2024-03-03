import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { DashboardContext } from '../pages/DashboardLayout'
import { FaAlignLeft } from "react-icons/fa";
import Logo from './Logo'
import LogoutBtn from './LogoutBtn';
import Themetoggle from './Themetoggle';
const Navbar = () => {
  const {toggleSidebar} = React.useContext(DashboardContext)
  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} className='toggle-btn'>
            <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <h2  className='logo-text'  >Dashboar</h2>
        </div>
        <div className=' btn-container' >
          <Themetoggle/>
          <LogoutBtn/>
        </div>
      </div>
     
    </Wrapper>
    
  )
}

export default Navbar