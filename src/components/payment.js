import React, { useState, useEffect } from "react";
import Header from "./header";
import payment from "../icons/payment.svg";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import "../styles/payment.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [loader, setloader] = useState(true);
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 3000);
  }, []);

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
      )}
    </>
  );
};

export default Payment;
