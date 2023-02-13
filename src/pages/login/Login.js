import { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import pathObj from "../../utils/apiPath";
import { useForm } from "react-hook-form";
import { validationRules } from "../../utils/constants";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ mode: "onChange", shouldFocusError: true, defaultValues: {} });

  const onSubmit = async (data) => {
    setIsLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const data1 = {
        username: data?.username,
        password: data?.password,
      };

      const res = await axios.post(
        process.env.REACT_APP_API_PATH + pathObj.login,
        data1
      );

      if (res?.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
        // setSuccess(true);
        setIsLoading(false);
        navigate("/");
      }

      reset({ username: "", password: "" });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setSuccess(err);
    }
  };

  console.log("user", success.message);

  return (
    <div className="login">
      <div className="login-inner">
        <span className="loginTitle">Login</span>
        <Form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Label>
              <label>Username</label>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              className="loginInput"
              placeholder="Enter your username..."
              {...register("username", {
                required: "Please enter username.",
              })}
            />
            <span className="text-danger">{errors?.username?.message}</span>
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
            disabled={isFetching}
          >
            LOGIN{" "}
            {isLoading && (
              <CircularProgress
                color="inherit"
                className="ms-3"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </Button>
          {success.message && (
            <h5 className="text-danger text-center mt-5">
              Invalid Credentials
            </h5>
          )}
        </Form>
      </div>
    </div>
  );
}
