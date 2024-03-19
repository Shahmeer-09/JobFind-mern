import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, Navbar, BigSidebar } from "../compnents/index";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import {  createContext } from "react";    
import customFetch from "../utils/customFetch";
 const DashboardContext = createContext();
export const loader =async ()=>{
     try {
         const {data }=await customFetch.get ('/user/current-user')
         return data
     } catch (error) {
          return redirect('/')
     }
 }
const DashboardLayout = ({themeSetter}) => {
   const  {rest:user} = useLoaderData()

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

 
  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarktheme,
        showSidebar,
        toggletheme,
        toggleSidebar,
    
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export {DashboardContext}
export default DashboardLayout;
