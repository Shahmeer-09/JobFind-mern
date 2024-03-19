
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../compnents/index";
import { Link , Form, useNavigation,redirect } from "react-router-dom";
import { FormRow } from "../compnents/index";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({request})=>{
     const formData = await request.formData();
     const data = Object.fromEntries(formData);
     try {
       await customFetch.post('/auth/reg', data)
       toast.success('Redistration successful')
       return redirect('/login')
     } catch (error) {
        toast.error(error?.response?.data?.msg)
       return {error}
     }
}


const Register = () => {
   const navigation = useNavigation();
   const isSubmitting = navigation.state === "submitting";
  
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>register</h4>
        <FormRow type="text" name="name" labelText="Name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}
        >
          {isSubmitting ? "loading..." : "register"}
      
        </button>
        <p>
          Already have an account?{" "}
          <Link className="member-btn" to={"/login"}>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
