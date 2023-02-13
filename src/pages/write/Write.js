import { Button, Container, Form } from "react-bootstrap";
import pathObj from "../../utils/apiPath";
import "./write.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const Write = () => {
  const { user } = useContext(Context);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ mode: "onChange", shouldFocusError: true, defaultValues: {} });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      username: user.username,
      title: data?.title,
      desc: data?.desc,
    };

    console.log("DATA", data);

    if (file) {
      const data1 = new FormData();
      const filename = Date.now() + file.name;
      data1.append("name", filename);
      data1.append("file", file);

      try {
        let res = await axios.post(
          process.env.REACT_APP_API_PATH + pathObj.upload,
          data1
        );
        if (res.data.filename) {
          payload.photo = res.data.filename;
        }
      } catch (err) {}
    }

    const res = await axios.post(
      process.env.REACT_APP_API_PATH + pathObj.getAllBlog,
      payload
    );

    console.log("res", res);

    if (res?.data) {
      console.log("response-add", res);
      setIsLoading(false);
      navigate("/");
    } else {
      console.log("please write post");
    }
    reset({ title: "", desc: "" });
  };

  return (
    <section className="write-sec">
      <Container>
        <div className="write">
          {file ? (
            <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
          ) : (
            <div className="add-image">
              <h4>Please Add Image</h4>
            </div>
          )}
          <Form className="writeForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="writeFormGroup mb-3">
              <Form.Label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </Form.Label>
              <Form.Control
                id="fileInput"
                type="file"
                name="profilePic"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <Form.Control
                autoFocus={true}
                className="writeInput ms-3"
                placeholder="Title"
                type="text"
                name="title"
                {...register("title", {
                  required: "Please enter title.",
                })}
              />
            </div>
            <span className="text-danger mb-3 d-block">
              {errors?.title?.message}
            </span>
            <div className="writeFormGroup mb-4">
              <Form.Control
                as="textarea"
                rows={5}
                name="desc"
                className="writeInput writeText h-100"
                placeholder="Tell your story..."
                autoFocus={true}
                {...register("desc", {
                  required: "Please enter description.",
                })}
              />
            </div>
            <span className="d-block mb-4 text-danger">
              {errors?.desc?.message}
            </span>

            <Button
              type="submit"
              className="loginButton d-flex justify-content-center align-items-center"
            >
              Submit{" "}
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
      </Container>
    </section>
  );
};

export default Write;
