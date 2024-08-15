import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RazorpayPayment = () => {
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [message, setMessage] = useState('');
  const [key, setKey] = useState();
  


  useEffect(()=>{
    axios.get('http://localhost:2000/pay/getkey')
    .then(function (response) {
      // handle success
      setKey(response.data.key)
      // console.log(key)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post('http://localhost:2000/pay/checkout', { amount });
      const { order } = orderResponse.data;
      setOrderId(order.id);
      console.log(orderId)

      const razorpayOptions = {
        key:key, 
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Nest',
        description: 'Payment for products/services',
        handler: function (response) {
          console.log(response.razorpay_payment_id)
          axios.post('http://localhost:2000/pay/verifyPayment', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
          }).then((verificationResponse) => {
            setMessage(verificationResponse.data.message);
          });
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Test address',
        },
        theme: {
          color: '#3BB77E',
        },
      };
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Razorpay Payment Integration</h2>
      <div>
        <label htmlFor="amount">Enter Amount: </label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
      </div>
      <button onClick={handlePayment}>Pay</button>
      <div>{message}</div>
      
    </div>
  );
};

export default RazorpayPayment;
