import React from "react";
import { Container} from "react-bootstrap";
import Login from "../../component/Login/Login";
import loginimg from "../../image/login-1.png";
import Navbar from "../../component/Navbar/Nav";
import "./LoginPage.css";
import { Link } from "react-router-dom";
const Formpage = () => (
  <>
    <Navbar />
    <div className="d-flex justify-content-center">
      <Container>
        <div className="">
          <div className="">
            <div className="row main-form justify-content-center aling-item-center ">
              <div className="col-md-12 col-lg-9 col-xl-9">
                <div className="row todo-form-box   g-5 justify-content-center justify-content-lg-between align-items-center">
                  <div className="col-12 col-md-6 d-none d-md-block">
                    <img src={loginimg} className="w-100"></img>
                  </div>
                  <div className=" col-12 col-md-6 tab-box mt-0">
                    <div className="heading_s1">
                      <h1 className="">Login</h1>
                      <p className="mb-30">
                        Don't have an account?{" "}
                        <Link to="/Register">Create here</Link>
                      </p>
                    </div>

                    <Login />
                    
                    {/* <Tabs
                 defaultActiveKey="signup"
                 id="fill-tab-example"
                 className="mb-3"
                 fill
               >
                 {" "}
                 <Tab eventKey="signup" title="signup">
                   <Register />
                 </Tab>
                 <Tab eventKey="login" title="login">
                   <Login />
                 </Tab>
               </Tabs> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </>
);

export default Formpage;
