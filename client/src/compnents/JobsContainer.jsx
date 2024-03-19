import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { AlljobsContext } from "../pages/AllJobs";
const JobsContainer = () => {
  const jobs = React.useContext(AlljobsContext);
  return (
    <Wrapper>
      {jobs && jobs.length == 0 && <h2>No jobs to display</h2>}
      <div className="jobs" >{jobs && jobs.map((job) => <Job key={job._id} {...job} />)}</div>
    </Wrapper>
  );
};

export default JobsContainer;
