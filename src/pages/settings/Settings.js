import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import pathObj from "../../utils/apiPath";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    setValue("username", user?.username);
    setValue("email", user?.email);
  }, []);

  console.log("file", file);

  const onSubmit = async (data) => {
    dispatch({ type: "UPDATE_START" });
    const payload = {
      userId: user?._id,
      username: data?.username,
      email: data?.email,
      password: data?.password,
    };

    if (file) {
      const data1 = new FormData();
      const filename = Date.now() + file.name;
      data1.append("name", filename);
      console.log("data1", data1);
      data1.append("file", file);

      try {
        let res = await axios.post(
          process.env.REACT_APP_API_PATH + pathObj.upload,
          data1
        );
        if (res.data.filename) {
          payload.profilePic = res.data.filename;
        }
      } catch (err) {}
    }

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_PATH + pathObj.users + user._id,
        payload
      );
      console.log("res", res);

      if (res?.data) {
        console.log("response-add", res);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        setSuccess(res?.data);
      } else {
        console.log("error");
      }
      // reset({ username: "", email: "", password: "" });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  console.log("abc", process.env.REACT_APP_API_PATH + pathObj.users + user._id);

  const handleDelete = async () => {
    try {
      if (window.confirm(`Are you sure you want to delete your account?`)) {
        const res = await axios.delete(
          process.env.REACT_APP_API_PATH + pathObj.users + user._id,
          { data: { userId: user._id } }
        );

        if (res.status == 200) {
          dispatch({ type: "LOGOUT" });
        }
      }
    } catch (error) {
      console.log("error in get all users list==>>>>", error.message);
    }
  };

  console.log("user", user.username);
  console.log("password", password);

  return (
    <div className="settings pb-5">
      <Container>
        <Row>
          <Col md={9}>
            <div className="settingsWrapper">
              <div className="settingsTitle">
                <span className="settingsTitleUpdate">Update Your Account</span>
                <span
                  className="settingsTitleDelete"
                  onClick={() => handleDelete()}
                >
                  Delete Account
                </span>
              </div>
              <Form className="settingsForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Profile Picture</Form.Label>
                <div className="settingsPP mb-4">
                  {/* {user?.profilePic ? (
                    <img
                      className="writeImg"
                      src={
                        file ? URL.createObjectURL(file) : PF + user?.profilePic
                      }
                      alt="NO_Image"
                    />
                  ) : (
                    <img
                      className="writeImg"
                      src={file && URL.createObjectURL(file)}
                      alt="NO_Image"
                    />
                  )} */}

                  {user?.profilePic ? (
                    <img
                      className="writeImg"
                      src={file ? URL.createObjectURL(file) : user?.profilePic}
                      alt="NO_Image"
                    />
                  ) : file ? (
                    <img
                      className="writeImg"
                      src={file && URL.createObjectURL(file)}
                      alt="NO_Image"
                    />
                  ) : (
                    <img
                      className="writeImg"
                      src="https://murli-server.up.railway.app/images/dummy.png"
                      alt="NO_Image"
                    />
                  )}

                  <Form.Label htmlFor="fileInput">
                    <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                  </Form.Label>

                  <Form.Control
                    id="fileInput"
                    type="file"
                    name="profilePic"
                    {...register("profilePic", {
                      onChange: (e) => setFile(e.target.files[0]),
                    })}
                    style={{ display: "none" }}
                    className="settingsPPInput"
                  />
                </div>
                <Form.Group className="mb-2">
                  <Form.Label>
                    <label>Username</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    {...register("username", {
                      required: "Please enter username.",
                    })}
                    className="loginInput"
                    placeholder="Enter your username..."
                  />
                  <span className="text-danger">
                    {errors?.username?.message}
                  </span>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>
                    <label>Email</label>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className="loginInput"
                    name="email"
                    {...register("email", {
                      required: "Please enter email.",
                    })}
                    placeholder="Enter your email..."
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
                      className="loginInput"
                      autoComplete="nope"
                      name="password"
                      {...register("password", {
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      // onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password..."
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

                  <span className="text-danger">
                    {errors?.password?.message}
                  </span>
                </Form.Group>
                <Button
                  className="settingsSubmitButton loginButton"
                  type="submit"
                >
                  Update
                </Button>
                {success && (
                  <span
                    style={{
                      color: "green",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "40px",
                      fontFamily: "fantasy",
                    }}
                  >
                    Profile has been updated...
                  </span>
                )}
              </Form>
            </div>
          </Col>
          <Col md={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Settings;
