import React from 'react'
import Links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import { DashboardContext } from '../pages/DashboardLayout';
const Navlinks = ({isBigSidebar}) => {
    const {toggleSidebar, user} = React.useContext(DashboardContext)
  return (
    <div className="nav-links">
    {Links.map((link) => {
      const { text, path, icon } = link;
      if(path === 'admin' && user.roles !== 'admin' ) return
       return (
        <NavLink onClick={ isBigSidebar ? null: toggleSidebar}  to={path} key={text} className='nav-link  ' end  >
          <span  className="icon" >{icon}</span>
          {text}
        </NavLink>
      );
    })} 
  </div>
  )
}

export default Navlinks