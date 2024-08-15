import React, { useEffect,useState } from 'react'
import './OrderList.css'
import axios from 'axios';
import { Link, Outlet,NavLink } from 'react-router-dom';
import {  Spinner, Table } from 'react-bootstrap';
import DownloadPDFButton from '../Pdf/Btnpdf';
const   Orderlist = () => {
  const [allorder, setAllorder] = useState(null);

useEffect(()=>{
    getorder()
},[])

    const getorder = ()=>{
        axios.get('http://localhost:2000/order',{  
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
  .then(function (response) {
    // handle success
    setAllorder(response.data)
    console.log(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })   
    }
  return (
    <div className=''>
    {
      allorder==null?<Spinner/>:   <div className='order-component'>
        {
          allorder.length>=0?     <div>
          <h3 class="mb-0">Your Orders</h3>
        <div className="card-body">

        
        <Table className="mt-4" border={1} responsive="sm">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                allorder?.map((item,index)=>{
                    const createdAtDate = new Date(item.createdAt);
    
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
                    const formattedDate = `${
                      monthNames[createdAtDate.getMonth()]
                    } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`;
                return(
            <tr>
              <td>{item.ordernumber}</td>
              <td>{formattedDate}</td>
              <td>{item.status}</td>
              <td>₹{item.subtotal} for {item.Product.length} item</td>
              <td>
                <NavLink to={`/Account/viwe/${item._id}`} className="btn-small d-block">
                  View
               </NavLink>
<DownloadPDFButton id ={item._id}/>

           
              </td>
            </tr>
                )
                })
            }
    
           
          </tbody>
        </Table>
      </div>
    </div>
         :<div>order is not add</div>
    
        }
   
  
      </div>
    }
 
    </div>
  )
}

export default Orderlist
