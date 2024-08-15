import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { GiBasket } from "react-icons/gi";
import Navbar from '../../component/Navbar/Nav';
import { Container } from 'react-bootstrap';
import { PiMapPin, PiUser } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './Account.css'
import { Link, NavLink, Outlet} from 'react-router-dom';
// import { IoIosLogOut } from "react-icons/io";
const Account = () => {
  const LogOut =()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }
  const FadeInDiv = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;
  return (
    <div>
   <div className=''>
    <Navbar/>

    <div className='AccountTab'>
          <Container>
            <Row>
              <Col lg={3} className='nav-grop mb-4 mb-lg-0 ' >
                <NavLink
                  to={'orderlist'}
                 

                >
                <GiBasket/> <p className='m-0'>Order</p>
                </NavLink>
                <NavLink
                  to={'MyAddress'}
                >
                  <PiMapPin/> <p className='m-0'>My Address</p>
                  
                </NavLink>
                <NavLink
                  to={'AccountDetails'}
                >
                 <PiUser/><p className='m-0'>Account Details</p>
                  
                </NavLink>
                <Link onClick={()=>LogOut()}> <FiLogOut/> <p className='m-0'>Logout</p></Link>
              </Col>
              <Col lg={9}>
              <FadeInDiv>
                <Outlet/>
                </FadeInDiv>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  
  )
}

export default Account
