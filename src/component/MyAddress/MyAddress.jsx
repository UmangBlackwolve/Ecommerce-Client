import React, { useState, useEffect } from "react";
import "./MyAddress.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AddressForm from "./AddressForm";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ApiUrl } from "../../App";
const MyAddress = () => {
  const [show, setShow] = useState(false);
  const [addressdata, setAddressdata] = useState(null);
  const [editvalue, seteditvalue] = useState();
  const [edit, setEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    seteditvalue(false);
  };
  useEffect(() => {
    getaddress();
  }, []);

  const deleteaddress = (id) => {
    axios
      .delete(`${ApiUrl}/addres/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    getaddress();
  };
  const getaddress = () => {
    axios
      .get(`${ApiUrl}/addres`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        // handle success
        setAddressdata(response.data);
        console.log("sssssss", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const editdata = (item) => {
    setShow(true);
    setEdit(true);
    seteditvalue(item);
  };

  return (
    <div className="">
      <div className="MyAddress">
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title> Address Add</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-5 py-md-5">
            <AddressForm
              setShow={setShow}
              getaddress={getaddress}
              setEdit={setEdit}
              edit={edit}
              editvalue={editvalue}
            />
          </Modal.Body>
        </Modal>
        <h3 className="mb-0">My Address</h3>
        <div className="mt-3">
          <div className="row gx-5">
            <div className=" col-sm-6  mb-3 col-lg-4 " onClick={handleShow}>
              <div className=" add-address">+ Add</div>
            </div>
            {addressdata?.map((item) => {
              return (
                <div className=" col-sm-6 col-lg-4   ">
                  <div className=" main-addbox">
                    <div className="address-box">
                      {item.address}
                      <br />
                      {item.city},{item.state} {item.postalCode},<br />{" "}
                      {item.country}
                    </div>

                    <div>
                      <div className="d-flex justify-content-center  action">
                        <div
                          className=" "
                          style={{
                            backgroundColor: "transparent",
                            color: "#3BB77E",
                          }}
                          onClick={() => editdata(item)}
                        >
                          <AiOutlineEdit />
                        </div>
                        <div
                          className=""
                          style={{
                            background: "transparent",
                            color: "#3BB77E",
                          }}
                          onClick={() => deleteaddress(item._id)}
                        >
                          <AiOutlineDelete />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
