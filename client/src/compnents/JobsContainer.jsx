import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { AlljobsContext } from "../pages/AllJobs";
// import Pagebtn from "./Pagebtn";
const JobsContainer = () => {
  const {data} = React.useContext(AlljobsContext);
  const {jobs,totalcount }= data
  return (
    <Wrapper>
      {jobs && jobs.length == 0 && <h2>No jobs to display</h2>}
      <h5>{totalcount} job{totalcount > 1 && 's'}  found </h5>
      <div className="jobs" >{jobs && jobs.map((jb) => <Job key={jb._id} {...jb} />)}</div>
      {/* <Pagebtn  /> */}
    </Wrapper>
  );
};

export default JobsContainer;
