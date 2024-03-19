import React, { useEffect } from "react";
import { SearchJobCont, JobsContainer } from "../compnents/index";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { createContext } from "react";

export const loader = async () => {
  try {
    const  {data} = await customFetch.get("/jobs/get");
    return data ;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
 export const action = async ({ params }) => {
     
 }
const AlljobsContext = createContext();

const AllJobs = () => {
  const {jobs}= useLoaderData();
  return (
    <AlljobsContext.Provider value={jobs}>
      <SearchJobCont />
      <JobsContainer />
    </AlljobsContext.Provider>
  );
};
export { AlljobsContext };
export default AllJobs;
