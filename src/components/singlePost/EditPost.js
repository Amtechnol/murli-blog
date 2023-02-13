import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import pathObj from "../../utils/apiPath";
import CircularProgress from "@mui/material/CircularProgress";

const EditPost = ({ show, handleToggle, singlePost, getSinglePost }) => {
  const { user } = useContext(Context);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
  });

  console.log(
    "process",
    process.env.REACT_APP_API_PATH + pathObj.singlePost + singlePost._id
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      title: data?.title,
      desc: data?.desc,
    };

    console.log("data", payload);

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
          payload.photo = res.data.filename;
        }
      } catch (err) {}
    }

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_PATH + pathObj.singlePost + singlePost._id,
        payload
      );

      console.log("res", res);

      if (res?.data) {
        console.log("updated-data", res);
        getSinglePost();
        setIsLoading(false);
        handleToggle();
      } else {
        console.log("please write post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setValue("title", singlePost?.title);
    setValue("desc", singlePost?.desc);
    // watch("photo", singlePost?.photo);
    setValue("photo", singlePost?.photo);
    // setValue("profilePic", singlePost?.photo);
  }, [singlePost]);

  return (
    <div>
      <Modal show={show} onHide={handleToggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4">
              <Form.Control
                id="fileInput"
                type="file"
                name="photo"
                {...register("photo", {
                  // required: "Please select picture",
                  onChange: (e) => setFile(e.target.files[0]),
                })}
                // style={{ display: "none" }}
                className="w-100"
              />
              <span className="text-danger mt-1 d-block">
                {errors?.photo?.message}
              </span>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title"
                type="text"
                name="title"
                {...register("title", {
                  required: "Please enter title.",
                })}
              />
              <span className="text-danger mt-1 d-block">
                {errors?.title?.message}
              </span>
            </Form.Group>
            <Form.Group className="mb-4">
              <div>
                <Form.Label className="mb-3">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="desc"
                  className="writeInput writeText h-100 w-100 border"
                  placeholder="Tell your story..."
                  autoFocus={true}
                  {...register("desc", {
                    required: "Please enter description.",
                  })}
                />
              </div>
              <span className="text-danger mt-1 d-block">
                {errors?.desc?.message}
              </span>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                type="submit"
                className="loginButton d-flex justify-content-center align-items-center mx-auto"
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
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditPost;
