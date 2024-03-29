import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../utils/clientlvlcontants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FormRow, SelectForm } from "../compnents/index";
import { useLoaderData } from "react-router-dom";
import { Editjb } from "../api/Jobs";
import { useQuery } from "@tanstack/react-query";
const editQuery = (id) => {
  return {
    queryKey: ["Edit", id],
    queryFn: async () => {
       const {data} =await customFetch.get(`/jobs/get/${id}`);
      return data.job;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editQuery(params.id));
      return params.id;
    } catch (error) {
      return redirect("/dashboard/all-jobs");
    }
  };
export const action =
  (queryClient) =>
  async ({ params, request }) => {
    const data = await request.formData();
    const formdata = Object.fromEntries(data);
    try {
      await customFetch.patch(`/jobs/update/${params.id}`, formdata);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("job updated succefully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error.response?.data?.msg);
      return error;
    }
  };
const EditJob = () => {
  const naviagation = useNavigation();
  const isubmitting = naviagation.state === "submitting";
  const id = useLoaderData();
const {data:job}= useQuery(editQuery(id))
  console.log(job[0]);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="company" Default={job[0].company} />
          <FormRow type="text" name="position" Default={job[0].position} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            Default={job[0].jobLocation}
          />
          <SelectForm
            name="jobStatus"
            list={Object.values(JOB_STATUS)}
            Default={job[0].jobStatus}
            labelText="job status"
          />
          <SelectForm
            name="jobType"
            list={Object.values(JOB_TYPE)}
            Default={job[0].jobType}
            labelText="job type"
          />

          <button type=" submit" className="btn btn-block form-btn">
            {isubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
