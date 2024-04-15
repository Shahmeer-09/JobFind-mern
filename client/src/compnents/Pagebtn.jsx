import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

import { useLocation, useNavigate } from "react-router-dom";
import { AlljobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const {data} = React.useContext(AlljobsContext);
  const { numOfPages, currentpage } = data;
  const [page, setpage]= useState(currentpage)
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = ( event,pageNumber) => {
    setpage(pageNumber)
  };
  useEffect(()=>{
    const searchParams = new URLSearchParams(search);
    searchParams.set("page",page );
    navigate(`${pathname}?${searchParams.toString()}`);
  },[])

  return (
    <Wrapper>
      <Pagination
        count={numOfPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Wrapper>
  );
};

export default PageBtnContainer;
