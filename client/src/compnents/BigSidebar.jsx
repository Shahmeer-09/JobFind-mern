import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useContext } from "react";
import { DashboardContext } from "../pages/DashboardLayout";

import Logo from "./Logo";
import Navlinks from "./Navlinks";
const BigSidebar = () => {
  const { showSidebar } = useContext(DashboardContext);

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar "
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
