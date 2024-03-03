import React from "react";
import { useState } from "react";
import { DashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

const LogoutBtn = () => {
  const { user, LogoutUser } = React.useContext(DashboardContext);
  const [logoutbtn, setLogoutbtn] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="logout-btn btn"
        onClick={() => setLogoutbtn(!logoutbtn)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={logoutbtn ? "dropdown show-dropdown" : "dropdown"}>
        <button onClick={LogoutUser} type="button" className="dropdown-btn ">
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutBtn;
