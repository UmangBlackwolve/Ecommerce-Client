import React from "react";
import Navbar from "../../component/Navbar/Nav";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import forgot_password from "../../image/forgot_password.svg"
import './ResertPassword.css'
import { Container } from "react-bootstrap";
import axios from "axios";
import { ApiUrl } from "../../App";
const Resetpassword = () => {
    const Submitdata  =  async (values,{ setSubmitting, resetForm })=>{
        
            const response = await axios.post(
              `${ApiUrl}/user/forgot-password`,
                {
                    email:values.email
                }
            ).then(function (response) {
                // handle success
                console.log(response.data);
              }).catch(function (error) {
                // handle error
                console.log(error);
              })
           
console.log(values)
setSubmitting(false)
resetForm()
            }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"email is not valid").required("Email is required"),
      });
    
  return (
    <div>
      <Navbar />
  <Container>
  <div className="row justify-content-center main-Reset">
<div className="  col-lg-5  col-xl-5 px-5">
    
<div className="heading_s1">
  <img
    className="border-radius-15"
    src={forgot_password}
    alt=""
  />
  <h2 className="mb-15 mt-15">Forgot your password?</h2>
  <p className="mb-30">
    Not to worry, we got you! Let’s get you a new password. Please enter your
    email address or your Username.
  </p>
</div>
<Formik
        initialValues={{
          email: "",
        }}
        onSubmit={Submitdata}
        validationSchema={validationSchema}
      >
        <Form>
        <div className="form-input mb-4">
        
        <Field type="text" id="email" name="email" placeholder="Username or Email *"/>
        <ErrorMessage name="email" component="div" className="error" />
      </div>
            <button type="submit" className="reset-btn">Reset password</button>
        </Form>
      </Formik>
</div>
   </div>
  </Container>
    </div>
  );
};

export default Resetpassword;
