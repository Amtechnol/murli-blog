import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./register.css";
import axios from "axios";
import pathObj from "../../utils/apiPath";
import { useForm } from "react-hook-form";
import { validationRules } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("showpassword", showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ mode: "onChange", shouldFocusError: true, defaultValues: {} });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      };

      setCurrentItem(data);

      const res = await axios.post(
        process.env.REACT_APP_API_PATH + pathObj.register,
        payload
      );

      if (res?.data) {
        console.log("response-add", res);
        setIsLoading(false);
        navigate("/login");
      } else {
        console.log("not-register");
      }
      reset({ username: "", email: "", password: "" });
    } catch (err) {
      console.log("err:", err);
    }
  };

  console.log("currentItem", currentItem);

  return (
    <div className="login">
      <div className="login-inner">
        <span className="loginTitle">Register</span>
        <Form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Label>
              <label>Username</label>
            </Form.Label>
            <Form.Control
              type="text"
              className="loginInput"
              name="username"
              placeholder="Enter your username..."
              {...register("username", {
                required: "Please enter name.",
              })}
            />
            <span className="text-danger">{errors?.username?.message}</span>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>
              <label>Email</label>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              className="loginInput"
              placeholder="Enter your email..."
              {...register("email", {
                required: "Please enter email.",
              })}
            />
            <span className="text-danger">{errors?.email?.message}</span>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>
              <label>Password</label>
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                className="loginInput"
                placeholder="Enter your password..."
                {...register("password", {
                  required: "Please enter password.",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              <Button
                className="position-absolute end-0 top-0 bottom-0 bg-transparent border-0 p-2 px-3"
                onClick={() => togglePassword()}
              >
                {showPassword ? (
                  <img src="images/view.png" alt="" />
                ) : (
                  <img src="images/hide.png" alt="" />
                )}
              </Button>
            </div>
            <span className="text-danger">{errors?.password?.message}</span>
          </Form.Group>

          <Button
            type="submit"
            className="loginButton d-flex justify-content-center align-items-center"
          >
            Register{" "}
            {isLoading && (
              <CircularProgress
                color="inherit"
                className="ms-3"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Register;
