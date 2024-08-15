import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from 'axios';



const Addressform = ({setShow,getaddress,edit,setEdit,editvalue}) => {
useEffect(()=>{
console.log(editvalue)
},[])
  const initialValues = {
    fullName:edit?editvalue.fullName: "",
    address:edit?editvalue.address: "", 
    city:edit?editvalue.city: "",
    state:edit?editvalue.state:"",
    postalCode:edit?editvalue.postalCode:"",
    country:edit?editvalue.country: "",
    phoneNumber:edit?editvalue.phoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    phoneNumber: Yup.string().required("Phone number is required").min(10).max(10),
  });


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission here
    // alert(values); // Convert values to string for alert
    edit?axios.put(`http://localhost:2000/addres/${editvalue._id}`, {
      fullName:values.fullName,
      address:values.address,
      city:values.city,
      state:values.state,
      postalCode:values.postalCode,
      country:values.country,
      phoneNumber:values.phoneNumber
     
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })  :axios.post('http://localhost:2000/addres', {
      fullName:values.fullName,
      address:values.address,
      city:values.city,
      state:values.state,
      postalCode:values.postalCode,
      country:values.country,
      phoneNumber:values.phoneNumber
     
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log(values)
    setShow(false)
    resetForm()
    getaddress()
    setEdit(false)
  };
  return (
    <div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >

        <Form className="address-form">
          <div className="row">
            <div className="form-input col-lg-6 mb-4">
              <Field type="text" name="fullName"  placeholder="FullName *" />
              <ErrorMessage name="fullName" component="div" className="error" />
            </div>

            <div className="form-input col-lg-6 mb-4">
              <Field as="select" name="city">
                <option value="">Select City</option>
                <option value="rajkot">rajkot</option>
                <option value="surat">surat</option>
                <option value="pune">pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                {/* Add more cities as needed */}
              </Field>
              <ErrorMessage name="city" component="div" className="error" />
            </div>

            <div className="form-input col-lg-6 mb-4">
              <Field as="select" name="state">
                <option value="">Select State</option>
                <option value="Gujarat">Gujarat</option>
                <option value="maharashtra">maharashtra</option>
                <option value="mumbai">mumbai</option>
                {/* Add more states as needed */}
              </Field>
              <ErrorMessage name="state" component="div" className="error" />
            </div>


            <div className="form-input col-lg-6 mb-4">
              <Field as="select" name="country">
                <option value="">Select Country</option>
                <option value="india">india</option>
                {/* Add more countries as needed */}
              </Field>
              <ErrorMessage name="country" component="div" className="error" />
            </div>

            <div className="form-input col-lg-6 mb-4 ">
              <Field type="text" name="postalCode" placeholder=" Postal Code *"/>
              <ErrorMessage name="postalCode" component="div" className="error"/>
            </div>
            <div className="form-input col-lg-6 mb-4">
              <Field type="text" name="phoneNumber" placeholder="phoneNumber *" />
              <ErrorMessage name="phoneNumber" component="div" className="error"/>
            </div>
          </div>

          <div className="form-input">
            {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="address" placeholder="Enter Address"></textarea> */}
            <Field type="text" className="form-control" id="exampleFormControlTextarea1" name="address" rows={3} placeholder="Enter Address *"/>
            <ErrorMessage name="address" component="div"  className="error"/>
          </div>

          <button variant="primary" className="btn-address btn" type="submit">
            Submit
          </button>
        </Form>

    </Formik>
  </div>
  );
};

export default Addressform;
