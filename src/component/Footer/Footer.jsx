import React from "react";
import { Container } from "react-bootstrap";
import logo from "../../image/logo.svg";
import { CiLocationOn } from "react-icons/ci";
import { FiHeadphones } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="main-footer mt-5">
        <Container>
        <div className="container pt-15 pb-20">
    <div className="row">
        <div className="col my-3 m-md-0 ">
            <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0 wow animate__ fadeInUp animated" data-wow-delay="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                <div className=" mb-30">
                    <a href="index.html" className="mb-15"><img src={logo}  /></a>
                    <p className="font-lg text-heading">Awesome grocery store website template</p>
                </div>
                <ul className="contact-infor">
                    <li><CiLocationOn/><strong>Address:</strong> <span>5171 W Campbell Ave undefined Kent, Utah 53127 United States</span></li>
                    <li><FiHeadphones/><strong>Call Us:</strong><span>(+91) - 540-025-124553</span></li>
                    <li><AiOutlineMail/><strong>Email:</strong><span>sale@Nest.com</span></li>
                    <li><AiOutlineFieldTime/><strong>Hours:</strong><span>10:00 - 18:00, Mon - Sat</span></li>
                </ul>
            </div>
        </div>
        <div className="footer-link-widget col " data-wow-delay=".1s">
            <h4 className="widget-title" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Company</h4>
            <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a>About Us</a></li>
                <li><a>Delivery Information</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Terms &amp; Conditions</a></li>
                <li><a>Support Center</a></li>
                <li><a>Careers</a></li>
            </ul>
        </div>
        <div className="footer-link-widget col my-3 m-md-0  " data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
            <h4 className="widget-title">Account</h4>
            <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a>Sign In</a></li>
                <li><a>View Cart</a></li>
                <li><a>My Wishlist</a></li>
                <li><a>Track My Order</a></li>
                <li><a>Help Ticket</a></li>
                <li><a>Shipping Details</a></li>
                <li><a>Compare products</a></li>
            </ul>
        </div>
        <div className="footer-link-widget col my-3 m-md-0 " data-wow-delay=".3s" style={{ visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp' }}>
            <h4 className="widget-title">Corporate</h4>
            <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a>Become a Vendor</a></li>
                <li><a>Affiliate Program</a></li>
                <li><a>Farm Business</a></li>
                <li><a>Farm Careers</a></li>
                <li><a>Our Suppliers</a></li>
                <li><a>Accessibility</a></li>
                <li><a>Promotions</a></li>
            </ul>
        </div>
        <div className="footer-link-widget col my-3 m-md-0 " data-wow-delay=".4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
            <h4 className="widget-title">Popular</h4>
            <ul className="footer-list mb-sm-5 mb-md-0">
                <li><a>Milk &amp; Flavoured Milk</a></li>
                <li><a>Butter and Margarine</a></li>
                <li><a>Eggs Substitutes</a></li>
                <li><a>Marmalades</a></li>
                <li><a>Sour Cream and Dips</a></li>
                <li><a>Tea &amp; Kombucha</a></li>
                <li><a>Cheese</a></li>
            </ul>
        </div>
        <div className="footer-link-widget widget-install-app col  my-3 m-md-0 " data-wow-delay=".5s" style={{ visibility: 'visible', animationDelay: '0.5s', animationName: 'fadeInUp' }}>
            <h4 className="widget-title">Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="download-app">
                <a className="hover-up mb-sm-2 mb-lg-0"><img className="active" src={require('../../image/app-store.jpg')}alt="" /></a>
                <a className="hover-up mb-sm-2"><img src={require('../../image/google-play.jpg')} alt="" /></a>
            </div>
            <p className="mb-20">Secured Payment Gateways</p>
            <img className="" src={require('../../image/payment-method.png')} alt="" />
        </div>
    </div>
</div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
