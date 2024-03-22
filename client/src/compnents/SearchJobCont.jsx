import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE ,JOB_SORT_BY} from "../utils/clientlvlcontants";
import { FormRow, SelectForm } from ".";
import { AlljobsContext } from "../pages/AllJobs";
import React from "react";
const SearchJobCont = () => {
  const submit = useSubmit();
  const {searchParams} = React.useContext(AlljobsContext)
  const {search, jobStatus, jobType, sort} = searchParams
  const debounce = (onchange)=>{
    let timeout;
    return (e)=>{
    const form = e.currentTarget.form
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        onchange(form)
      },1000)
    }
  }
  
   return (
     <Wrapper>
         
      <Form  className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>

          <FormRow  type='search' name='search'  Default={search}    onchange={debounce((form) => submit(form))} />
          <SelectForm
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            Default={jobStatus}

            onchange={debounce((form) => submit(form))}
            
          />
          <SelectForm
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            Default={jobType}
            onchange={debounce((form) => submit(form))}
          />
          <SelectForm
            name='sort'
            Default={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onchange={debounce((form) => submit(form))}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
{/*    
          <button type=" submit" className="btn btn-block form-btn">
             search
          </button> */}
        </div>
      </Form>
    
     </Wrapper>

  )
}

export default SearchJobCont