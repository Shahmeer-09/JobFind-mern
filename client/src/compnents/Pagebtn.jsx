import React from "react";
import Pagination from "@mui/material/Pagination";

import { useLocation, useNavigate } from "react-router-dom";
import { AlljobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const {data} = React.useContext(AlljobsContext);
  const { numOfPages, currentpage } = data;
  console.log(numOfPages,currentpage);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = ( event,pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page",pageNumber );
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <Pagination
        count={numOfPages}
        page={currentpage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Wrapper>
  );
};

export default PageBtnContainer;
