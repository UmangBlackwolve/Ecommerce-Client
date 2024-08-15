import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { ApiUrl } from "../../App";


const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email is not valid").required("Email is required"),
    password: Yup.string().required(),
    name: Yup.string().required("name is required"),
    confirm_password: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [conshowPassword, setConShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleconformPasswordVisibility = () => {
    setConShowPassword(!conshowPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${ApiUrl}/user/register`,
        values
      );

      // Store the token in local storage

      // Additional logic after successful login (e.g., redirecting user)
    } catch (error) {
      console.error("Signup error:", error.message);
      // Handle login error (e.g., display error message to the user)
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-input mb-4">
        
              <Field type="text" id="name" name="name" placeholder="Name *"/>
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-input mb-4">
              <Field type="email" id="email" name="email" placeholder="Email *" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-input mb-4">
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="password *"
              />
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={togglePasswordVisibility}
                style={{ marginLeft: "-30px" }}
              >
                <BiShow />
              </button>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-input">
              <Field
                type={conshowPassword ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                placeholder="confirm_password *"
              />
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={toggleconformPasswordVisibility}
                style={{ marginLeft: "-30px" }}
              >
                <BiShow />
              </button>
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="error"
              />
            </div>  

            <button type="submit" className="btn-register">Submit & Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
