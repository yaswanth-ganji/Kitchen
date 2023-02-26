import React from "react";
import Header from "./header";
import payment from "../icons/payment.svg";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import "../styles/payment.css";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };
  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  //testing
  return (
    <>
      <Header />
      <div className="payment-main">
        <div className="paymentDiv">
          <img src={payment} width={90} height={90} alt="" />
          <p className="payment-p1">Payment Successful</p>

          <p className="payment-p2">
            <span>Thank you for ordering</span>
            <span>Your payment is successfully completed</span>
          </p>
          <button onClick={gotoHome}>Go To Home Page</button>
        </div>
      </div>
    </>
  );
};

export default Payment;
