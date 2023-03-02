import React, { useState, useEffect } from "react";
import Header from "./header";
import payment from "../icons/payment.svg";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import "../styles/payment.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useNavigate } from "react-router-dom";

import { useCart } from "react-use-cart";
import paymentfailed from "../icons/paymentfailed.jpg";
const Payment = () => {
  const [loader, setloader] = useState(true);
  const navigate = useNavigate();
  var balance = localStorage.getItem("walletDetails");
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const gotoHome = () => {
    navigate("/");
  };
  const gotoWallet = () => {
    navigate("/Wallet");
  };
  useEffect(() => {
    console.log(cartTotal);
    setTimeout(() => {
      setloader(false);
    }, 3000);
  }, []);
  let data1;
  if (cartTotal <= balance) {
    const originalBalance = balance - cartTotal;
    localStorage.setItem("walletDetails", JSON.stringify(originalBalance));
    emptyCart();
    data1 = (
      <div className="paymentDiv">
        <img src={payment} width={90} height={90} alt="" />
        <p className="payment-p1">Payment Successful</p>

        <p className="payment-p2">
          <span>Thank you for ordering</span>
          <span>Your payment is successfully completed</span>
        </p>
        <button onClick={gotoHome}>Go To Home Page</button>
      </div>
    );
  } else {
    data1 = (
      <div className="paymentDiv">
        <img src={paymentfailed} width={90} height={90} alt="" />
        <p className="payment-p1">Payment Failed</p>
        <p className="payment-p2">
          <span>Insufficient Funds</span>
          <span>Please add Money to the wallet</span>
        </p>
        <button onClick={gotoWallet}>Go To Wallet</button>
      </div>
    );
  }

  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      {loader ? (
        <div className="loaderDiv">
          <Loader type="TailSpin" color="#f7931e" height={60} width={60} />
        </div>
      ) : (
        <div className="payment-main">{data1}</div>
      )}
    </>
  );
};

export default Payment;
