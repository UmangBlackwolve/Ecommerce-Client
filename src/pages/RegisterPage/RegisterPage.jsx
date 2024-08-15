import React from "react";
import { Container } from "react-bootstrap";
import Register from "../../component/Register/Register";
import Nav from "../../component/Navbar/Nav";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
const registerpage = () => {
  return (
    <div>
      <Nav />
      <div className="main-register">
        <div>
          <Container>
            <div className="register-box">
              <div className="row justify-content-center">
                <div className=" col-lg-8 col-xl-6">
                  <div className="heading_s1">
                    <h1 className="">Create an Account</h1>
                    <p className="mb-30">
                      Already have an account?{" "}
                      <Link to={'/login'} style={{color:"#3bb77e"}}>Login</Link>
                    </p>
                  </div>

                  <Register />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default registerpage;
