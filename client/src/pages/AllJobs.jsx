import React, { useEffect } from "react";
import { SearchJobCont, JobsContainer } from "../compnents/index";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { createContext } from "react";

export const loader = async ({request}) => {
  try {
    let params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/jobs/get", { params });
    return { data, searchParams: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AlljobsContext = createContext();

const AllJobs = () => {
  const { data, searchParams } = useLoaderData();

  return (
    <AlljobsContext.Provider value={{ data, searchParams }}>
      <SearchJobCont />
      <JobsContainer />
    </AlljobsContext.Provider>
  );
};
export { AlljobsContext };
export default AllJobs;
