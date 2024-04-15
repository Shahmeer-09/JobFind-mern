import React, { useEffect } from "react";
import { SearchJobCont, JobsContainer , } from "../compnents/index";
import { useLoaderData , } from "react-router-dom";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getjobs } from "../api/Jobs";
const alljobsQuery = (params)=>{
  const {search, jobStatus, jobType, sort, page} = params;
  console.log(search, jobStatus, jobType, sort);
  return {
    queryKey: ["jobs", search ?? '', jobStatus ?? 'all', jobType ?? 'all', sort ?? 'newest', page?? 1] ,
    queryFn:() =>getjobs(params),
  }
}
export const loader =(queryClient)=> async ({request}) => {
  
    let params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
      const data=await queryClient.ensureQueryData(alljobsQuery(params))
    return { searchParams: { ...params } };

};

const AlljobsContext = createContext();

const AllJobs = () => {
  const {searchParams } = useLoaderData();
  const {data} = useQuery(alljobsQuery(searchParams));

  console.log(data, searchParams);
  return (
    <AlljobsContext.Provider value={{ data, searchParams }}>
      <SearchJobCont />
      <JobsContainer />
    </AlljobsContext.Provider>
  );
};
export { AlljobsContext };
export default AllJobs;
