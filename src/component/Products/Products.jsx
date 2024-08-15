import React, { useEffect, useState } from "react";
import "./Products.css";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { Container, Spinner } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShuffle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../App";
const Products = () => {
  console.log("Api_Url",ApiUrl);
  const [allProducts, setAllProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getAllCategories();
  }, [params.category]);

  const url = params.category
    ? `${ApiUrl}/product/category/${params.category}`
    : `${ApiUrl}/product`;

  const getProducts = () => {
    axios
      .get(url)
      .then(response => {
        setAllProducts(response.data);
        calculateCategoryCounts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAllCategories = () => {
    axios
      .get(`${ApiUrl}/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const calculateCategoryCounts = (products) => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    setCategoryCounts(counts);
  };

  const viewData = (id) => {
    navigate(`/view/${id}`);
  };

  const addFavoriteList = (productId) => {
    axios
      .post(
        `${ApiUrl}/wish`,
        { productId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    navigate("/like");
  };

  const addDataCart = (productId) => {
    axios
      .post(
        `${ApiUrl}/cart/add`,
        { productId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    navigate("/add");
  };

  return (
    <div className="">
      {allProducts === null && categories === null ? (
        <Spinner />
      ) : (
        <div className="mt-5">
          <Container>
            <div className="row">
              <div className="col-lg-7 col-xxl-9">
                <div className="row">
                  {allProducts?.length <= 0 ? (
                    <div>{params.category} products not available</div>
                  ) : (
                    allProducts?.map((item, index) => (
                      <div className="col-sm-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                        <div className="products-box">
                          <div className="img-box">
                            <img className="img-box1" src={`${ApiUrl}/${item.image[0]}`} alt={item.name}></img>
                            <img className="img-box2" src={`${ApiUrl}/${item.image[1]}`} alt={item.name}></img>
                            <div className="icons-hover d-flex">
                              <button
                                className="hover-icon border-0 bg-white"
                                onClick={() => addFavoriteList(item._id)}
                              >
                                <AiOutlineHeart />
                              </button>
                              <button className="hover-icon border-0 bg-white">
                                <BsShuffle />
                              </button>
                              <button
                                className="hover-icon border-0 bg-white"
                                onClick={() => viewData(item._id)}
                              >
                                <BiShow />
                              </button>
                            </div>
                          </div>
                          <div className="products-text">
                            <div
                              className="product-category"
                              style={{
                                marginBottom: "5px",
                                fontSize: "12px",
                                color: "#adadad",
                              }}
                            >
                              <a>{item.category}</a>
                            </div>
                            <h2>
                              <a>{item.name}</a>
                            </h2>
                            <div className="d-flex">
                              <div className="star d-flex align-items-center">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <BsStarHalf />
                              </div>
                              <span className="font-small ml-5 text-muted">(4.0)</span>
                            </div>
                            <div>
                              <span className="" style={{ color: "#B6B6B6" }}>
                                By <a className="text-brand">{item.company}</a>
                              </span>
                            </div>
                            <div className="product-card-bottom d-flex justify-content-between">
                              <div className="product-price">
                                <span className="price">₹{item.price}</span>
                               
                              </div>
                              <div className="add-cart">
                                <button
                                  className="add-cart"
                                  onClick={() => addDataCart(item._id)}
                                >
                                  <CiShoppingCart />
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="col-lg-5 col-xl-4 col-xxl-3">
                <div
                  className="theiaStickySidebar"
                  style={{
                    paddingTop: 0,
                    paddingBottom: 1,
                    position: "static",
                    transform: "none",
                  }}
                >
                  <div className="sidebar-widget widget-category-2 mb-30 primary-sidebar">
                    <h5 className="section-title style-1 mb-30">Category</h5>
                    <ul className="m-0 p-0">
                      <li>
                        <Link to="/">
                          All <img src="" alt="" />
                        </Link>
                        <span className="count">{allProducts?.length}</span>
                      </li>
                      {categories?.map((item, index) => (
                        <li key={index}>
                          <Link to={`/home/${item.name}`}>
                            <img
                              width="50px"
                              src={`${ApiUrl}/${item.image}`}
                              alt={item.name}
                            />
                            {item.name}
                          </Link>
                          <span className="count">{categoryCounts[item.name] || 0}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Products;
