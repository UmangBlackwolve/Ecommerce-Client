import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar/Nav";
import {Container, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import "./AddToCart.css";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ApiUrl } from "../../App";
const Addtocart = () => {
  const [allcart, setAllcart] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [key, setKey] = useState();
  const [addressdata, setAddressdata] = useState();
  const [statusid, setStatusid] = useState(null);
  const [handleAddressChange, sethandleAddressChange] = useState();
  


  // const[subtotal,setSubtotal] = useState(0)
  var subtotal = 0;
  useEffect(() => {
    getcart();
    getkey();
    getaddress();
  }, []);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${ApiUrl}/pay/checkout`,
        { amount: subtotal }
      );
      const { order } = orderResponse.data;
      setOrderId(order.id);
      console.log(orderId);
      const razorpayOptions = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Nest",
        description: "Payment for products/services",
        handler: function (response) {
          console.log(response.razorpay_payment_id);
          axios
            .post(`${ApiUrl}/pay/verifyPayment`, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            })
            .then((verificationResponse) => {
       orderlist("deliver");

              // editstatus("deliver")
              setMessage(verificationResponse.data.message);
              deleteall()
            });
        },
        
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Test address",
        },
        theme: {
          color: "#3BB77E",
        },
      };
      const razorpay = new window.Razorpay(razorpayOptions);
      
      razorpay.open();

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const getkey = () => {
    axios
      .get(`${ApiUrl}/pay/getkey`)
      .then(function (response) {
        // handle success
        setKey(response.data.key);
        // console.log(key)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getcart = () => {
    axios
      .get(`${ApiUrl}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setAllcart(response.data);
        console.log(allcart);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const orderlist = async (status) => {
    const response = await axios
      .post(
        `${ApiUrl}/order/add-order`,
        {
          Product: allcart,
          quantity: allcart.quantity,
          subtotal: subtotal,
          status:status,
          Addressid:handleAddressChange
          
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        // handle success
        console.log("ssss", response);
          setStatusid(response?.data?._id);
          localStorage.setItem('orderId', response?.data?._id);
        console.log(statusid)
        // console.log(response.data.data._id)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    subtotal = 0;

    getcart();
  };
  const editstatus = async (status)=>{
    const response = await axios
      .put(
        `${ApiUrl}/order/${localStorage.getItem('orderId')}`,
        {
          status:status
          
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        // handle success
        console.log("ordernsdffnkfsnfsopidbspgbwopjgbsog", response);
        localStorage.setItem('orderId')
  
      })
      .catch(function (error) {
        // handle error
        console.log(statusid?._id)
        console.log(error);
      });
  }
  const deleteall = () => {
    axios
      .get(`${ApiUrl}/cart/alldelete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        getcart()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  
  };
  const deletecart = (id, item) => {
    subtotal = subtotal - item.amount;
    console.log(subtotal);
    axios
      .delete(`${ApiUrl}/cart/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    getcart();
    // getcart()
  };
  const getaddress = () => {
    axios
      .get(`${ApiUrl}/addres`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        // handle success
        setAddressdata(response.data);
        console.log("fsfssfsfsfsfssfsfs", addressdata);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handlechange =(selectedValue)=>{
    const selectedAddress = JSON.parse(selectedValue);
    sethandleAddressChange(selectedAddress.id)
    console.log("handleAddressChange",handleAddressChange)
  }
  const pulsqty = async (item)=>{
    axios
    .put(`${ApiUrl}/cart/qtyplus/${item._id}`,{
      quantity:item.quantity+=1
    })
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    getcart()
  }
  const minesqty = async (item)=>{
    axios
    .put(`${ApiUrl}/cart/qtyplus/${item._id}`,{
      quantity:item.quantity-=1
    })
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    getcart()
  }
  const validationSchema = Yup.object().shape({
    selectedAddress: Yup.string().required('Please select an address')
  });
  return (
    <div>
      {/* {
        allcart?.map((item,index)=>{
            return(
                <div>{item.productId.name}</div>
            )
        }) */}
      {/* } */}
      <Navbar />
      {
        allcart==null?<Spinner/>:      <Container>
        <div className="my-3">
          <h1>Your Cart</h1>
          <div class="d-flex justify-content-between">
            <h6 class="text-body">
              There are <span class="text-brand">{allcart?.length}</span> products in your cart
            </h6>
            <h6 class="text-body">
              <a href="#" class="text-muted">
                <i class="fi-rs-trash mr-5"></i>Clear Cart
              </a>
            </h6>
          </div>
        </div>

        {allcart?.length <= 0 ? (
          <div>no more products add your cart </div>
        ) : (
          <div className="main-cart ">
            <div className="row">
              <div className="col-12">
                <table className="table table-cart" border={1}>
                  <thead>
                    <tr className="main-heading ">
                      <th scope="col" colSpan={2} className="start text-center">
                        Product
                      </th>
                      <th scope="col">name</th>

                      <th scope="col" className="text-center">
                        Unit Price
                      </th>
                      <th scope="col" className="text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-center">
                        Subtotal
                      </th>
                      <th scope="col" className="text-center end">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allcart?.map((item, index) => {
                      item.amount = item.productId.price * item.quantity;
                      subtotal = subtotal + item.amount;

                      console.log(subtotal);
                      return (
                        <tr className="pt-30">
                          <td className="image product-thumbnail pt-4 text-center ">
                            <img
                              src={`${ApiUrl}/${item.productId.image[0]}`}
                            ></img>
                          </td>
                          <td className="product-des product-name">
                            <h6 className="">
                              <p className="product-name mb-10 text-heading">
                                {item.productId.name}
                              </p>
                            </h6>
                            <div className="product-rate-cover text-center">
                              <div className="d-flex">
                                <div className="star d-flex align-items-center">
                                  <AiFillStar />
                                  <AiFillStar />
                                  <AiFillStar />
                                  <AiFillStar />
                                  <BsStarHalf />
                                </div>
                                <span class="font-small ml-5 text-muted">
                                  {" "}
                                  (4.0)
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="price text-center" data-title="Price">
                            <h4 className="text-brand">
                              {" "}
                              ₹{item.productId.price}{" "}
                            </h4>
                          </td>
                          <td
                            className=" detail-info text-center"
                            data-title="quantity"
                          >
                            <div className="detail-extralink mr-15 text-center d-flex justify-content-end justify-content-md-center">
                              <div className="detail-qty border radius d-flex justify-content-around">
                                <button className="border-0 bg-transparent" onClick={()=>pulsqty(item)}>
                                  +
                                </button>
                                <span className="qty-val">{item.quantity}</span>
                                <button className="border-0 bg-transparent" onClick={()=>minesqty(item)}>
                                  -
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="price text-center" data-title="Price">
                            <h4 className="text-brand">₹{item.amount} </h4>
                          </td>
                          <td
                            className="action text-center remove"
                            data-title="Remove"
                          >
                            <AiOutlineDelete
                              onClick={() => deletecart(item._id, item)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Formik
        initialValues={{
          selectedAddress: "" // Initial value for selected address
        }}
        onSubmit={(values, actions) => {
  
          const selectedAddress = values.selectedAddress; // Access the selected address
          console.log(selectedAddress);
        
          sethandleAddressChange(selectedAddress)
          handlePayment(  )
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema} 
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form>
            {/* Your existing JSX for displaying cart items */}
            {/* Your existing JSX for displaying cart totals */}

            {/* New JSX for address selection */}
            <div className="row">
              <div className="col-lg-6">
                <div className="total-box">
                  <div className="table-responsive border-1 total-table ">
                    <table className="table no-border">
                      <tbody>
                        {/* Address selection */}
                    
                        <tr>
                          <td scope="col" colSpan={2}>
                            <div className="divider-2 mt-10 mb-10" />
                          </td>
                        </tr>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted m-0">Shipping</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h5 className="text-heading text-end m-0">Free </h5>
                          </td>
                        </tr>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted m-0">Address</h6>
                          </td>
                          <td className="cart_total_amount">
                            <Field
                              name="selectedAddress"
                              as="select"
                              className="w-100"
                            >
                              <option value="">Select address</option>
                              {addressdata?.map((item, index) => (
                                <option
                                  key={index}
                                  value={item._id}
                                >
                                  {item.address}
                                  <br />
                                  {item.city}, {item.state} {item.postalCode},
                                  <br />
                                  {item.country}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage name="selectedAddress" className="error" component="div" />
                     
                          </td>
                        </tr>
                        <tr>
                          <td scope="col" colSpan={2}>
                            <div className="divider-2 mt-10 mb-10" />
                          </td>
                        </tr>
                        <tr>
                          <td className="cart_total_label">
                            <h6 className="text-muted m-0">Total</h6>
                          </td>
                          <td className="cart_total_amount">
                            <h4 className="text-brand text-end m-0">
                              ₹{subtotal}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button className="total-btn w-100" type="submit">
                    Proceed To CheckOut
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
            </div>

            {/* <button onClick={}>chekout</button> */}
          </div>
        )}
      </Container>

      }

    </div>
  );
};

export default Addtocart;
