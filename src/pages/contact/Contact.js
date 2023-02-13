import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./contact.css";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Contact = () => {
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", shouldFocusError: true, defaultValues: {} });

  const navigate = useNavigate();

  const sendEmail = () => {
    setIsLoading(true);
    emailjs
      .sendForm(
        "service_8r1twob",
        "template_xfzggpl",
        form.current,
        "4NREhgij6to2KqcT2"
      )
      .then(
        (result) => {
          setSuccessMessage(result.text);
          console.log(result.text);
          setIsLoading(false);
          console.log("message sent");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="contact-sec about-page">
      <Container>
        {" "}
        <Row>
          <Col md={6} className="m-auto bg-white p-5 rounded border">
            <Form ref={form} onSubmit={handleSubmit(sendEmail)}>
              <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  {...register("user_name", {
                    required: "Please enter username",
                  })}
                />
                {errors?.user_name && (
                  <span className="mt-3 d-block text-danger">
                    {errors?.user_name?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  {...register("user_email", {
                    required: "Please enter email",
                  })}
                />
                {errors.user_email && (
                  <span className="mt-3 d-block text-danger">
                    {errors?.user_email?.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  placeholder="Message"
                  {...register("message", {
                    required: "Please write message",
                  })}
                />

                {errors?.message && (
                  <span className="mt-3 d-block text-danger">
                    {errors?.message?.message}
                  </span>
                )}
              </Form.Group>

              <Button
                type="submit"
                value="Send"
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
            </Form>
            {successMessage && (
              <h5 className="text-center p-4">
                Thank you for filling out your information! We will connect soon
              </h5>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
