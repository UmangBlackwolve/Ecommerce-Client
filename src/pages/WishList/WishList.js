import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar/Nav";
import { Container, Spinner } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsStarHalf } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import "./WishList.css";
import { ApiUrl } from "../../App";
const Favoritelist = () => {
  const [alllist, setAlllist] = useState(null);
  const navigen = useNavigate();
  useEffect(() => {
    getwish();
  }, []);
  const deletecart = (id) => {
    axios
      .delete(`${ApiUrl}/wish/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    getwish();
  };

  const getwish = () => {
    axios
      .get(`${ApiUrl}/wish`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        // handle success
        setAlllist(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const addcart = (productId) => {
    console.log(localStorage.getItem("token"));
    axios
      .post(
        `${ApiUrl}/cart/add`,
        {
          productId: productId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    navigen("/add");
  };
  return (
    <div>
      <Navbar />
      {alllist == null ? (
        <Spinner />
      ) : (
        <Container>
          <div className="my-3">
            <h1>Your Wishlist</h1>
            <div className="d-flex justify-content-between">
              <h6 className="text-body">
                There are <span className="text-brand">{alllist?.length}</span>
                products in this list
              </h6>
              <h6 className="text-body">
                <a href="#" className="text-muted">
                  <i className="fi-rs-trash mr-5"></i>Clear Cart
                </a>
              </h6>
            </div>
          </div>

          {alllist?.length <= 0 ? (
            <div>no more products</div>
          ) : (
            <div className="main-cart ">
              <div className="row">
                <div className="col-12">
                  <table className="table table-cart" border={1}>
                    <thead>
                      <tr className="main-heading">
                        <th scope="col" className="start text-center">
                          Product
                        </th>
                        <th scope="col">name</th>
                        <th scope="col" className="text-center">
                          Price
                        </th>
                        <th scope="col" className="text-center">
                          Action
                        </th>
                        <th scope="col" className="end text-center">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {alllist?.map((item, index) => {
                        return (
                          <tr className="pt-30">
                            <td className="image product-thumbnail pt-40 text-center">
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
                              <div className="product-rate-cover">
                                <div className="d-flex">
                                  <div className="star d-flex align-items-center">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <BsStarHalf />
                                  </div>
                                  <span className="font-small ml-5 text-muted">
                                    {" "}
                                    (4.0)
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td
                              className="price text-center"
                              data-title="Price"
                            >
                              <h4 className="text-brand">
                                {" "}
                                ₹{item.productId.price}{" "}
                              </h4>
                            </td>

                            <td
                              className="text-end text-md-center"
                              data-title="Action"
                            >
                              <button
                                className="btn text-white addcartbtn"
                                style={{ backgroundColor: "#3BB77E" }}
                                onClick={() => addcart(item.productId)}
                              >
                                Add To Card
                              </button>
                            </td>
                            <td
                              className="action text-center remove"
                              data-title="Remove"
                            >
                              <AiOutlineDelete
                                onClick={() => deletecart(item._id)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Favoritelist;
