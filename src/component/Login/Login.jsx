import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ApiUrl } from "../../App";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigen = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await axios
      .post(`${ApiUrl}/user/login`, values)
      .then(function (response) {
        const token = response.data.token;
        alert("Login successful");
        localStorage.setItem("token", token);
    navigen("/");

      })
      .catch(function (error) {
        console.log("asss", error);
        alert(error.response.data.Message);
      });
    resetForm();
  };
  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-input mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Username or Email *"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-input">
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Your password *"
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
            <div className="login_footer form-group mb-50 d-flex justify-content-between">
              <div className="chek-form">
                <div className="custome-checkbox d-flex align-items-center">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    name="checkbox"
                    id="exampleCheckbox1"
                    defaultValue=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="exampleCheckbox1"
                  >
                    <span>Remember me</span>
                  </label>
                </div>
              </div>
              <Link className="text-muted"  to={'/resetpassword'}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-login">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
