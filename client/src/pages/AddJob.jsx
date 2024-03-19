import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../utils/clientlvlcontants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FormRow, SelectForm } from "../compnents/index";
import { useOutletContext } from "react-router-dom";
export const action = async ({ request }) => {
  const data = await request.formData();
  const formdata = Object.fromEntries(data);
  try {
    await customFetch.post("/jobs/create", formdata);
    toast.success("job created succefully");
    return redirect('all-jobs');
  } catch (error) {
    toast.error(error.response?.data?.msg);
    return error;
  }
};
const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isubimitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="company" />
          <FormRow type="text" name="position" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            Default={user.location}
          />
          <SelectForm
            name="jobStatus"
            list={Object.values(JOB_STATUS)}
            Default={JOB_STATUS.PENDING}
            labelText="job status"
          />
          <SelectForm
            name="jobType"
            list={Object.values(JOB_TYPE)}
            Default={JOB_TYPE.FULLTIME}
            labelText="job type"
          />

          <button type=" submit" className="btn btn-block form-btn">
            {isubimitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
