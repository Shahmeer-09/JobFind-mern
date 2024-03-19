import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../compnents/index";
import { Link, Form, useNavigation, redirect } from "react-router-dom";
import { FormRow } from "../compnents/index";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error.response?.data?.msg);
    console.log(error.response?.data);
    return { error };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const LoginDemo = async () => {
    const Data = {
      email: "test@gmail.com",
      password: "test123456",
    };
    try {
      await customFetch.post("/auth/login", Data);
      toast.success("Take a Test Drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block">
          {" "}
          {isSubmitting ? "submittig..." : "Login"}{" "}
        </button>
        <button onClick={LoginDemo} type="btn" className="btn btn-block">
          Explore The App
        </button>
        <p>
          Not yet have an account ?{" "}
          <Link className="member-btn" to={"/register"}>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
