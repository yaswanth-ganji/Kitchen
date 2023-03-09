import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import "../styles/wallet.css";
import { useState } from "react";
import LogoutModel from "./LogoutModel";
const Wallet = () => {
  var balance = localStorage.getItem("walletDetails");
  const [x, setx] = useState(JSON.parse(balance));
  const [Open, setOpen] = useState(false);
  const deposit = (e) => {
    e.preventDefault();
    var inputDataele = document.getElementById("addAmount").value;
    var inpdata = parseInt(inputDataele);
    if (inpdata > 0) {
      setOpen(true);
    }
  };

  const depositAmt = () => {
    var inputDataele = document.getElementById("addAmount").value;
    var inpdata = parseInt(inputDataele);
    console.log(inpdata);
    if (inpdata > 0) {
      setx(x + inpdata);
    }
    inputDataele = "";
    setOpen(false);
  };
  var amount;
  if (balance == null) {
    amount = (
      <span
        className="heading heading1"
        style={{ paddingLeft: 4, paddingBottom: 3 }}
      >
        0
      </span>
    );
  } else {
    amount = (
      <span
        className="heading heading1"
        style={{ paddingLeft: 4, paddingBottom: 3 }}
      >
        {x}
      </span>
    );
  }
  useEffect(() => {
    localStorage.setItem("walletDetails", JSON.stringify(x));
  }, [x]);
  return (
    <div className="walletMain">
      <Header />
      <div className="walletContainer1">
        <div className="walletContainer">
          <div className="balanceDivMain">
            <div className="balanceDiv">
              <span className="heading">Available Wallet Balance</span>
              <div className="balanceDiv1">
                <span className="heading heading1">&#8377;</span>

                {amount}
              </div>
            </div>
            <p className="description">
              You can add amount to the Kitchen Wallet to order delicious food
              items.
            </p>
          </div>
          <div className="addMoneyDiv">
            <span className="heading">Add Money to Kitchen Wallet</span>

            <div>
              <form onSubmit={deposit} className="addMoneyDiv1">
                <div className="inputDiv">
                  <span className="rupeespan">&#8377;</span>
                  <input
                    id="addAmount"
                    type="number"
                    placeholder="Enter Amount"
                    min="0"
                  />
                </div>
                <button type="submit">Add Money</button>
              </form>
            </div>
          </div>
          <div className="noteDiv">
            <span className="description">NOTE</span>
            <ul>
              <li className="description">
                Money added to your Kitchen Wallet cannot be refunded or
                transferred to your back account.
              </li>
              <li className="description">
                Kitchen Wallet balance can only be used for transactions on
                Tasty Kitchen.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <LogoutModel
          message={`Are you sure you want to add the fund?`}
          isOpen={Open}
          onClose={() => setOpen(false)}
          onLogOut={depositAmt}
          btnNo="No"
          btnYes="Yes"
        />
      </div>
      <Footer />
    </div>
  );
};
export default Wallet;
