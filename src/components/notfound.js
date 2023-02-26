import React from "react";
import pagenotfound from "../icons/pagenotfound.svg";
import "../styles/payment.css";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const Navigate = useNavigate();
  const gotoHome = () => {
    Navigate("/");
  };
  return (
    <div className="payment-main">
      <div className="paymentDiv">
        <img src={pagenotfound} width={350} height={350} alt="" />
        <p className="payment-p1">Page Not Found</p>

        <p className="payment-p2">
          <span>We are sorry, the page you requested could not be found.</span>
          <span>please go back to the homepage.</span>
        </p>
        <button onClick={gotoHome}>Go To Home Page</button>
      </div>
    </div>
  );
};

export default Notfound;
