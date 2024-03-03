import { DashboardContext } from "../pages/DashboardLayout";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import React from "react";
const Themetoggle = () => {
  const {isDarktheme, toggletheme} = React.useContext(DashboardContext);
  return (
    <Wrapper onClick={toggletheme}>
      {isDarktheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default Themetoggle;
