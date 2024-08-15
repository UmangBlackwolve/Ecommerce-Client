import React, { useEffect } from "react";
import { Badge, Container } from "react-bootstrap";
import "./Nav.css";
import logo from "../../image/logo.svg";
import Dropdown from "react-bootstrap/Dropdown";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { CiLocationOn} from "react-icons/ci";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiHeadphones } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../App";
const Nav = () => {
  const [show, setShow] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();

  useEffect(() => {
    getCartCount();
    getWishCount()
    handleClose();
  }, [location.pathname]);
  const getCartCount = () => {
    axios
      .get(`${ApiUrl}/cart`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const count = response.data.length;
        setCartCount(count);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const getWishCount = () => {
    axios.get(`${ApiUrl}/wish`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(function (response) {
        const wishcount = response.data.length
        setWishCount(wishcount)
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }

  return (
    <div>
      <div className="main-nav">
        <div className="mobile-promotion d-lg-none">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div>

        <div className="top-nav d-lg-flex justify-content-between align-items-center d-none ">
          <Container>
            <div className="d-flex justify-content-between align-items-center">
              <div className="">
                <ul className="d-flex m-0">
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="/">My Account</a>
                  </li>
                  <li>
                    <a href="/">Wishlist</a>
                  </li>
                  <li>
                    <a href="/">Order Tracking</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="m-0 d-flex align-items-center">
                  <li>
                    Need help? Call Us:{" "}
                    <strong className="text-brand"> + 1800 900</strong>
                  </li>
                  <div className="d-flex">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="bg-transparent border-0"
                        style={{ color: "#7E7E7E", fontSize: "13px" }}
                      >
                        English
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          Français
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Deutsch</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Pусский</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="bg-transparent border-0"
                        style={{ color: "#7E7E7E", fontSize: "14px" }}
                      >
                        USD
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          Français
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">INR</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">MBP</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </ul>
              </div>
            </div>
          </Container>
        </div>
        <div className="main-headar">
          <Container>
            <div className="d-flex align-items-center justify-content-between">
              <div className="mob-menu d-lg-none">
                <Button variant="bg-trafrent" onClick={handleShow}>
                  <FaBars className="bar-icon" />
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                      <div className="d-flex">
                        <img className="logo-img" src={logo} alt="logo"></img>
                      </div>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="mob-menu">
                      <div className="d-flex align-items-center ">
                        <input
                          type="text"
                          placeholder="Search for items"
                          className="Search-for-items"
                        />
                        <BsSearch className="search-icon" />
                      </div>
                      <ul className="p-0 m-0 mob-main">
                        <li href="/">
                          <Link to={"/"}>Home</Link>
                        </li>
                        <li href="/">
                          <Link to={"/Account/orderlist"}>My Account</Link>
                        </li>
                        <li href="/">
                          <Link to={"/like"}>Wishlist</Link>
                        </li>
                        <li href="/">
                          <a href="/">Order Tracking</a>
                        </li>
                      </ul>
                      <div className="mobile-header-info-wrap">
                        <div className="single-mobile-header-info">
                          <Link className="d-flex align-items-center">
                            <CiLocationOn className="mob-icon" /> Our location{" "}
                          </Link>
                        </div>
                        <div className="single-mobile-header-info">
                          <a
                            href="/"
                            to={"/login"}
                            className="d-flex align-items-center"
                          >
                            <AiOutlineUser className="mob-icon" /> Log In / Sign
                            Up{" "}
                          </a>
                        </div>
                        <div className="single-mobile-header-info">
                          <a className="d-flex align-items-center" href="/">
                            <FiHeadphones className="mob-icon" />
                            (+01) - 2345 - 6789{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
              <div className="logo ">
                <img src={logo} className="logo-img" alt="logo"></img>
              </div>
              <div className=" main-info">
                <ul className=" d-none d-lg-flex m-0">
                  <li href="/">
                    <Link to="/">Home</Link>
                  </li>
                  <li href="/">
                    <a href="/">About</a>
                  </li>
                  <li href="/">
                    <a href="/">Shop </a>
                  </li>
                  <li href="/">
                    <a href="/">Vendors </a>
                  </li>
                  <li href="/">
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="main-shop d-flex icon ">
                <div className="shop">
                  <Link to={"/add"} style={{ color: "#253D4E" }}>
                    {" "}
                    <AiOutlineShoppingCart />
                  </Link>{" "}
                  <Badge className="total">{cartCount || 0}</Badge>
                </div>
                <div className="like">
                  <Link to={"/like"} style={{ color: "#253D4E" }}>
                    <AiOutlineHeart />
                  </Link>{" "}
                  <Badge className="total">{wishCount || 0}</Badge>
                </div>
                <div className="user">
                  <Link to={"/Account/orderlist"} style={{ color: "#253D4E" }}>
                    <AiOutlineUser />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Nav;
