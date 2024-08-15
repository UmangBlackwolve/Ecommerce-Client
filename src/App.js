import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Registerpage from './pages/RegisterPage/RegisterPage';
import Addtocart from './pages/AddToCart/AddToCart';
import Protecter from './component/Protecter/Protecter';
import Loginpage from './pages/Loginpage/LoginPage';
import Forgetpassword from './pages/Forget/ForgetPassword';
import RazorpayPayment from './component/Rezorpay/Rezorpay';
import Favoritelist from './pages/WishList/WishList';
import View from './pages/View/View';
import Account from './pages/Account/Account';
import Orderlist from './component/OrderList/OrderList';
import MyAddress from './component/MyAddress/MyAddress';
import Orderviwe from './component/OrderView/OrderView';
import Resetpassword from './pages/ResetPassword/ResetPassword';
import AccountDetails from './component/AccountDetails/AccountDetails';
import NotFound from './pages/NotFound/NotFound';
import Pdf from './component/Pdf/Pdf';
export const ApiUrl = "https://ecommerce-next-server.onrender.com"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home/:category' element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/user/reset-password/:id" element={<Forgetpassword />} />
        <Route path="/add" element={<Protecter Component={Addtocart} />} />
        <Route path="/Razorpay" element={<RazorpayPayment />} />
        <Route path="/like" element={<Protecter Component={Favoritelist} />} />
        <Route path="/view/:id" element={<View />} />
        <Route path='/Pdf' element={<Pdf />} />
        <Route path="/Account/*" element={<Protecter Component={Account} />} >
          <Route path="orderlist" element={<Orderlist />} />
          <Route path="MyAddress" element={<MyAddress />} />
          <Route path="AccountDetails" element={<AccountDetails />} />
          <Route path="viwe/:id" element={<Orderviwe />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
