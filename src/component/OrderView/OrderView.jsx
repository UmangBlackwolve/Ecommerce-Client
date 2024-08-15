import React, { useEffect, useState } from "react";
import "./OrderView.css";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ApiUrl } from "../../App";
const Orderviwe = () => {
  useEffect(() => {
    getsingle();
  }, []);
  const [productdata, setProductdata] = useState();
  const [alldata, setAlldata] = useState();
  const [ret, setRet] = useState();
  const [productId, setproductId] = useState();
  const [comment, setcomment] = useState();

  const [show, setShow] = useState(false);
  const ratingChanged = (newRating) => {
    setRet(newRating);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setproductId(id);
  };
  const perams = useParams();
  const getsingle = () => {
    axios
      .get(`${ApiUrl}/order/${perams.id}`)
      .then(function (response) {
        // handle success
        setProductdata(response.data.Product);
        setAlldata(response.data);
        console.log(productdata);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const AddComment = () => {
    axios
      .post(`${ApiUrl}/reviwe`, {
        comment: comment,
        stare: ret,
        productId: productId,
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(comment)
    setShow(false)
    setRet(0)
    setproductId(null)
    setcomment('')
  };
  return (
    <div>
      {
        alldata==null?<Spinner/>: <div className="Orderviwe">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rate and reviwe</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Form>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={40}
                value={ret}
                color2={"#ffd700"}
              />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>reviwe</Form.Label>
                <Form.Control as="textarea" rows={3} name="comment" value={comment} onChange={(e)=>setcomment(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0">
       
            <Button style={{backgroundColor:"#3BB77E",borderColor:"transparent  "}} onClick={() => AddComment()}>
          Send
            </Button>
          </Modal.Footer>
        </Modal>
        <h3 class="mb-0 thanks-order">Thanks for your Order, {alldata?.userId?.name}!</h3>
        <div className="">
          <div className="row order-viwebox">
            <table className="table table-cart mb-0">
              <thead>
                <tr className="main-heading">
                  <th scope="col" colSpan={2} className="start">
                    Product
                  </th>
                  <th scope="col">description</th>
                  <th scope="col" className="text-center">status</th>
                  <th scope="col" className="text-center">price</th>
                  <th scope="col" className="text-center">Quantity</th>
                  <th scope="col" className={alldata?.status=="deliver"?"text-center":"text-center end"}>Amount</th>
                {alldata?.status=="deliver"? <th scope="col" className="text-center end" >
                    comments
                  </th>:null} 
                </tr>
              </thead>
              <tbody className="orderlist-grop">
                {productdata?.map((item, index) => {
                  return (
                    <tr className=" ">
                      <td className="image text-center product-thumbnail pt-40 order-img">
                        <img
                          src={`${ApiUrl}/${item.productId.image[0]}`}
                        ></img>
                      </td>
                      <td className="product-des product-name">
                        <h6 className="">
                          <p className="product-name mb-10 text-heading">
                            {item.productId.name  }
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
                            <span class="font-small ml-5 text-muted"> (4.0)</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center view-status"data-title="status" > 
                        <h5 style={{fontSize:"17px"}}>{alldata?.status}</h5>
                      </td>
                      <td className="price text-center" data-title="Price">
                        <h4 className="text-brand"> ₹{item.productId.price} </h4>
                      </td>
                      <td className=" text-end text-md-center detail-info" data-title="Stock">
                        <div className="detail-extralink qty-box mr-15">
                          <span className="qty-val">{item.quantity}</span>
                        </div>
                      </td>
                      <td className="price text-center" data-title="Price">
                        <h4 className="text-brand">₹{item.amount} </h4>
                      </td>
                   {alldata?.status=="deliver"  ? <td className="action text-center  remove comments" data-title="comments">
                        <button
                          className="btn"
                          style={{ backgroundColor: "#3BB77E", color: "white" }}
                          onClick={() => handleShow(item.productId._id)}
                        >
                          comments
                        </button>
                        {/* <BiCommentDetail /> */}
                      </td>:null}
                    </tr>
                  );
                })}
                <tr className="ps-0 total-row">
                  <td colSpan={ alldata?.status=="deliver"?6:5} className="ps-5 ">
                    <h4>Subtotal</h4>
                  </td>
                  <td className="text-center">
                    <h4 className="text-brand ">₹{alldata?.subtotal}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      }
    </div>
   
  );
};

export default Orderviwe;
