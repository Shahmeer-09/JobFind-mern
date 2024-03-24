import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, Navbar, BigSidebar, Loading } from "../compnents/index";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createContext } from "react";
import customFetch from "../utils/customFetch";
import { DefaultthemeCheker } from "../App";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../api/Jobs";
import { toast } from "react-toastify";
const DashboardContext = createContext();
const getUser = {
  queryKey: ["user"],
  queryFn: getCurrentUser,
}
export const loader = (querClient)=> async() => {
  try {
     return await querClient.ensureQueryData(getUser);
  } catch (error) {
    toast.error(error);
    return redirect("/");
  }
};
const DashboardLayout = ({querClient}) => {

const {data}= useQuery(getUser)
const {rest:user} = data;

  const navigation = useNavigation();
  const isloading = navigation.state === "loading";
  const [showSidebar, setshowSidebar] = useState(false);
  const [isDarktheme, setisDarkTheme] = useState(DefaultthemeCheker());
  const toggletheme = () => {
    const ThemeNew = !isDarktheme;
    setisDarkTheme(ThemeNew)
    document.body.classList.toggle("dark-theme", ThemeNew);
    localStorage.setItem("darktheme", ThemeNew);
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
        querClient
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isloading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export { DashboardContext };
export default DashboardLayout;
