import { Pagination } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  & .MuiPaginationItem-root {
    color: var(--primary-500);
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    border-radius: var(--border-radius);
    cursor: pointer;
  }
  & .Mui-selected {
    background: var(--primary-500);
    color: var(--primary-200);
  }
  .MuiPaginationItem-root:hover {
    background: var(--primary-500);
    color: var(--white);
  }
  
`;
export default Wrapper;