import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import "../styles/cart.css";
import "../styles/fooditemdetail.css";
import rupee from "../icons/rupee2.svg";
import rupee1 from "../icons/rupee1.svg";
import { useCart } from "react-use-cart";
import addcart from "../icons/addcart.svg";
import removecart from "../icons/removecart.svg";
import cooking from "../icons/cooking.svg";
import cartitemcancel from "../icons/cartitemcancel.svg";
import { useNavigate } from "react-router-dom";
import LogoutModel from "./LogoutModel";
import Cookie from "js-cookie";
import delcart from "../icons/delfinal.svg";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Open, setOpen] = useState(false);
  const [isFooter, setisFooter] = useState(false);
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
  const continuePayment = () => {
    navigate("/payment");
    setOpen(false);
  };
  const getpayment = () => {
    setOpen(true);
  };
  const orderNow = () => {
    navigate("/");
  };
  const itemDetails = items.map((eachItem) => {
    return (
      <tr>
        <td
          className="imgtd"
          onClick={() => navigate(`/items/${eachItem.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={eachItem.image} width={136} height={100} alt="" />
          <span className="itemName">{eachItem.name}</span>
        </td>

        <td>
          <div className="cartAddDiv">
            <img
              src={removecart}
              alt=""
              onClick={() => {
                if (eachItem.quantity > 1) {
                  updateItemQuantity(eachItem.id, eachItem.quantity - 1);
                }
              }}
              className="addRemoveItembtns"
            />

            <span className="selectedItemData">{eachItem.quantity}</span>
            <img
              alt=""
              src={addcart}
              onClick={() => {
                updateItemQuantity(eachItem.id, eachItem.quantity + 1);
              }}
              className="addRemoveItembtns"
            />
          </div>
        </td>

        <td>
          <div className="itemQuantity">
            <img src={rupee} width={18} height={12} alt="" />
            <span>{eachItem.price * eachItem.quantity}</span>
          </div>
        </td>
        <td>
          <img
            className="delImg"
            alt=""
            src={cartitemcancel}
            width={30}
            height={22}
            onClick={() => {
              removeItem(eachItem.id);
            }}
          />
        </td>
      </tr>
    );
  });
  var cartData;
  if (isEmpty) {
    if (isFooter === true) {
      setisFooter(false);
    }
    cartData = (
      <div className="NoOrdersDiv">
        <img src={cooking} Width={425} Height={367} alt="" />
        <p className="NoOrders-P1">No Orders Yet!</p>
        <p className="NoOrders-P2">
          Your cart is empty. Add something from the menu.
        </p>
        <button className="NoOrders-btn" onClick={orderNow}>
          Order Now
        </button>
      </div>
    );
  } else {
    if (isFooter === false) {
      setisFooter(true);
    }
    cartData = (
      <>
        <div className="totalItemsDetails">
          <p>
            Cart ({totalUniqueItems}) total items:({totalItems})
          </p>
          <div
            className="clearCartDiv"
            style={{ cursor: "pointer" }}
            onClick={() => {
              emptyCart();
            }}
          >
            <p>Clear Cart</p>
            <img
              src={delcart}
              width={25}
              height={15}
              style={{ marginTop: "4px" }}
              alt=""
            />
          </div>
        </div>

        <table>
          <thead>
            <tr className="tablehead">
              <th className="itemTitle">
                <span>Item</span>
              </th>
              <th>Quantity</th>
              <th className="priceTh">price</th>
            </tr>
            {itemDetails}
          </thead>
        </table>
        <>
          <div className="orderPriceMain">
            <div className="orderPrice">
              <span className="orderTotal">Order Total:</span>
              <span className="orderTotalPrice">
                <img src={rupee1} width={18} height={25} alt="" />
                {cartTotal}
              </span>
            </div>

            <div className="placeOrderDiv">
              <button onClick={getpayment}>Place Order</button>
            </div>
          </div>
        </>
      </>
    );
  }

  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="cartMain">
        <Header />
        <div className="tableContainer">
          <div className="tableDiv">{cartData}</div>
        </div>
        {isFooter && (
          <div className="footerDiv">
            <Footer />
          </div>
        )}
      </div>
      <div>
        <LogoutModel
          message="Are you sure that you want to continue the payment?"
          isOpen={Open}
          onClose={() => setOpen(false)}
          onLogOut={continuePayment}
          btnNo="No"
          btnYes="Yes, Continue"
        />
      </div>
    </>
  );
};

export default Cart;
