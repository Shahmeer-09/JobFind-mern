import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';

import { useLocation, useNavigate } from "react-router-dom";
import { AlljobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const {data} = React.useContext(AlljobsContext);
  const { numOfPages, currentpage } = data;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageUpdate =(event, pageNumber)=>{
    const searchParams = new URLSearchParams(search);
    searchParams.set("page",pageNumber );
    navigate(`${pathname}?${searchParams.toString()}`);
  }


  return (
  
      <Pagination
        count={numOfPages}
        page={currentpage}
        onChange={handlePageUpdate}
        variant="outlined"
        shape="rounded"
      />
  
  );
};

export default PageBtnContainer;
