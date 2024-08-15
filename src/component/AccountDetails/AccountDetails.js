import React from "react";
import "./AccountDetails.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"; // Impo
import axios from "axios";
const AccountDetails = () => {
  const handelsubmit = (values, { resetForm }) => {
    console.log(values);
    axios.post('http://localhost:2000/user/update-profile', values,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    resetForm();
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .max(10)
      .min(10),
  
  });
  const initialValues = {
    name: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  };
  return (
    <div>
      <div className="AccountDetails">
        <div className="AccountDetails-top">
          <h5>Account Details</h5>
        </div>
        <div className="Account-form">
          <Formik
            onSubmit={handelsubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="row">
                <div className="form-group col-md-6 form-input">
                  <label htmlFor="name">Name *</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group col-md-6 form-input">
                  <label htmlFor="lastName">Last Name *</label>
                  <Field type="text" name="lastName" className="form-control" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="form-group form-input ">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group form-input ">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error-message"
                />
              </div>
       
              <button type="submit" className="btn btn-primary form-save">
                Save Change
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
