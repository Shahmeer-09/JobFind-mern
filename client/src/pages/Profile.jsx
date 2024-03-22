import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FormRow } from "../compnents/index";
import { useOutletContext } from "react-router-dom";
export const action = async ({ request }) => {
  const formdata = await request.formData();
  
  const file = formdata.get("avatar");
  if( file && file.size > 500000){
    toast.error("file size is too large")
      return null
  }
  try {
     await customFetch.patch("/user/update-user", formdata);
    toast.success("user updated succefully");
  } catch (error) {
    toast.error(error.response?.data?.msg); 
  }
return null;
}
const Profile = () => {
  console.log('im profile')
  const { user } = useOutletContext();
  const { name, email, location, lastName } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
 
  return (
    <Wrapper>
      <Form method="patch" className="form" encType="multipart/form-data">
          <h4 className="form-title"> Profile </h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" Default={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText={"last name"}
            Default={lastName}
          />
          <FormRow type="email" name="email" Default={email} />
          <FormRow type="text" name="location" Default={location} />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
