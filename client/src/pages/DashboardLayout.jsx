import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, Navbar, BigSidebar } from "../compnents/index";
import { Outlet } from "react-router-dom";
import {  createContext } from "react";    
// import { DefaultthemeCheker } from "../App";
 const DashboardContext = createContext();
const DashboardLayout = ({themeSetter}) => {
  const user = { name: "shahmeer" };
  const [showSidebar, setshowSidebar] = useState(false);
  const [isDarktheme, setisDarkTheme] = useState(themeSetter);
  const toggletheme = () => {
    const  ThemeNew = !isDarktheme
    setisDarkTheme(ThemeNew);
    document.body.classList.toggle('dark-theme', ThemeNew);
   localStorage.setItem('darktheme', ThemeNew)
  };
  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("user logged out");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarktheme,
        showSidebar,
        toggletheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export {DashboardContext}
export default DashboardLayout;
