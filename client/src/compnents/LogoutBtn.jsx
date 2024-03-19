import React from "react";
import { useState } from "react";
import { DashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const LogoutBtn = () => {
  const { user} = React.useContext(DashboardContext);
  const navigate = useNavigate();
  const [logoutbtn, setLogoutbtn] = useState(false);
    const logoutuser =async ()=>{
      navigate('/');
      await customFetch.get('/auth/logout')
      toast.success('logout successful')  
    }
  return (
    <Wrapper>
      <button
        type="button"
        className="logout-btn btn"
        onClick={() => setLogoutbtn(!logoutbtn)}
      >
        {user.avatar? <img src={user.avatar} alt="user" className="img" /> : <FaUserCircle/>}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={logoutbtn ? "dropdown show-dropdown" : "dropdown"}>
        <button onClick={logoutuser} type="button" className="dropdown-btn ">
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutBtn;
