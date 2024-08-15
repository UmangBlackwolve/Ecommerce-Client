import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Nav";
import resetimg from "../../image/reset_password.svg";
import "./ForgetPassword.css";
const Forgetpassword = () => {
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const params = useParams();
  const navigen = useNavigate()
  const validationSchema = Yup.object().shape({
    password: Yup.string().required(),
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
  console.log(params.id);
  //   console.log(params.token)
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    console.log(params.id);
    try {
      const response = await axios
        .post(`http://localhost:2000/user/reset-password/${params.id}`, {
          password: values.password,
        })
        .then(function (response) {
          // handle success
          console.log(response);
        });
      // Store the token in local storage

      // Additional logic after successful login (e.g., redirecting user)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle login error (e.g., display error message to the user)
    } finally {
      setSubmitting(false);
      resetForm();
    }
    navigen('/')
  };

  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="row justify-content-center main-forget">
          <div className="  col-lg-8 col-xl-7">
            <div className="row">
              <div className="heading_s1">
                <img src={resetimg} />
                <h2 className="mb-15 mt-15">Set new password</h2>
                <p className="mb-30">
                  Please create a new password that you don’t use on any other
                  site.
                </p>
              </div>
              <div className="col-lg-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
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
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-input ">
                      <Field
                        type={conshowPassword ? "text" : "password"}
                        id="confirm_password"
                        placeholder="Confirm you password *"
                        name="confirm_password"
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

                    <button type="submit" className="forget-btn mt-3">
                    Reset password
                    </button>
                  </Form>
                </Formik>
              </div>
              <div className=" mt-3 mt-lg-0 col-lg-6 ps-5">
                <h6 className="mb-15">Password must:</h6>
                <p className="m-0">Be between 9 and 64 characters</p>
                <p className="m-0">Include at least tow of the following:</p>
                <ul className="p-0 forget-ul" style={{ listStyle: "outside" }}>
                  <li>An uppercase character</li>
                  <li>A lowercase character</li>
                  <li>A number</li>
                  <li>A special character</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
