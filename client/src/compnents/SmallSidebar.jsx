import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { IoClose } from "react-icons/io5";
import Logo from "../compnents/Logo";
import Links from "../utils/Links";
import { NavLink } from "react-router-dom";
import { DashboardContext } from "../pages/DashboardLayout";
import Navlinks from "../compnents/Navlinks";


const SmallSidebar = () => {

  const {toggleSidebar, showSidebar} = React.useContext(DashboardContext)

   return ( 
    <Wrapper>
      <div className={showSidebar? "sidebar-container show-sidebar": "sidebar-container"}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar} >
            <IoClose />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
