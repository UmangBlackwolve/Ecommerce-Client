import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Nav";
import ReactImageMagnify from "react-image-magnify";
import { Container } from "react-bootstrap";
import "./View.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsCart3, BsShuffle, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { ApiUrl } from "../../App";

const View = () => {
  const [category, setCategory] = useState();
  const [viewitem, setViewitem] = useState();
  const navigen = useNavigate();
  const params = useParams();
  useEffect(() => {
    allcategory();
    viweitem();
  }, []);


  const adddatacart = (productId) => {
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
  const likeproduct = (productId) => {
    axios
      .post(
        `${ApiUrl}/wish`,
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
      });
    navigen("/like");
  }
  const allcategory = () => {
    axios
      .get(`${ApiUrl}/Categories`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setCategory(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const viweitem = () => {
    axios
      .get(`${ApiUrl}/product/${params.id}`)
      .then(function (response) {
        // handle success
        console.log(response.data.product);
        setViewitem(response.data.product);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  return (
    <div>
      <Navbar />
      <Container>
        <div className="view-page">
          {viewitem?.map((item) => {
            return (
              <div>
                <div className="row">
                  <div className=" col-lg-6 col-xxl-5 mt-4">
                    <div className="product-image-view">
                      <ReactImageMagnify
                        className="zoom-img"
                        {...{
                          smallImage: {
                            alt: "Small Image",
                            src: ` ${ApiUrl}/${item.image[0]}`,
                            isFluidWidth: true,
                            display: "flex",
                          },
                          largeImage: {
                            alt: "Large Image",
                            src: ` ${ApiUrl}/${item.image[0]}`,
                            width: 1200,
                            height: 1600,
                          },
                          enlargedImageContainerStyle: { zIndex: 999 },
                          isHintEnabled: true,
                          enlargedImagePosition: "over",
                        }}
                      />
                    </div>
                  </div>
                  <div className="  col-lg-6 col-xxl-4">
                    <div className="view-info">
                      <span className="stock-status out-stock"> Sale Off </span>
                      <h2 className="title-detail">{item.name}</h2>
                      <div className="d-flex">
                        <div className="star d-flex align-items-center">
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <BsStarHalf />
                        </div>
                        <span class="font-small ml-5 text-muted"> (4.0)</span>
                      </div>
                      <div className="clearfix product-price-cover">
                        <div className="product-price primary-color float-left">
                          <span className="current-price text-brand">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                      <div className="short-desc mt-3">
                        <p className="view-p m-0">
                          {item.description}
                        </p>
                      </div>
                      <div className="icon-flex align-items-center mt-4">
                        <button
                          className="btn-view text-white  d-flex align-items-center"
                          onClick={() => adddatacart(item._id)}
                        >
                          <BsCart3 className="me-2" />
                          Add To Card
                        </button>
                        <div className="d-flex">
                          <button className=" border-0 bg-white icons-view" onClick={() => likeproduct(item._id)}>
                            <AiOutlineHeart />
                          </button>
                          <button className=" border-0 bg-white icons-view">
                            <BsShuffle />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  {
                    item.data.length > 0 ?
                      <div className="col-md8 reviews">
                        <h6>Customer questions & answers</h6>
                        {item.data.map((items, index) => {
                          const createdAtDate = new Date(items.createdAt);

                          // Define month names array
                          const monthNames = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ];

                          // Format date
                          const formattedDate = `${monthNames[createdAtDate.getMonth()]
                            } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()} at ${createdAtDate.getHours()}:${createdAtDate.getMinutes()} ${createdAtDate.getHours() >= 12 ? "pm" : "am"
                            }`;

                          return (
                            <div className="box-review col-lg-12 col-xl-8">
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="review-img text-center">
                                    <img
                                      src={require("../../image/user.jpg")}
                                      alt=""
                                    />
                                    <div>
                                      <a
                                        href="#"
                                        className="font-heading text-brand"
                                      >
                                        {items.reviewUsers[0].name}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          {formattedDate}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        />
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      {items.comment}
                                      <ReactStars
                                        count={5}
                                        value={items.stare}
                                        edit={false}
                                        size={24}
                                        color2={"#fdc040"}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div> : null
                  }

                </div> */}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default View;
