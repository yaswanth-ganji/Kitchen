import React from "react";
import rating from "../icons/rating.svg";
import "../styles/fooditemdetail.css";
import rupee from "../icons/rupee1.svg";
import { useCart } from "react-use-cart";
import { NavLink } from "react-router-dom";
import payment from "../icons/payment.svg";
const Fooditemdetail = ({ item }) => {
  const { addItem, items } = useCart();

  const cartDetails = {
    id: item.id,
    image: item.image_url,
    name: item.name,
    price: item.cost,
  };

  const addItemstoCart = () => {
    addItem(cartDetails);
  };
  var x = items.map((eachItem) => {
    return eachItem.id;
  });
  var addBtn;
  if (x.includes(item.id)) {
    addBtn = (
      <div className="AdddedDiv">
        <img src={payment} width={30} height={20} alt="" />
        <span className="itemAdded-span">Added</span>
      </div>
    );
  } else {
    addBtn = <button onClick={addItemstoCart}>Add</button>;
  }

  return (
    <>
      <div className="foodItemContainer">
        <img
          src={item.image_url}
          width={280}
          height={180}
          className="foodItemImg"
          alt=""
        />

        {/* <img src={item.image_url} width={256} height={150} /> */}
        <div className="foodItemSubContainer">
          <NavLink to={`/items/${item.id}`} className="foodItemName1">
            <h2 className="foodItemName">{item.name}</h2>
          </NavLink>

          <div className="foodItemRatingDiv">
            <img src={rupee} width={19} height={12} alt="" />
            <span className="foodItemCost">{item.cost}</span>
          </div>

          <div className="foodItemRatingDiv">
            <img src={rating} width={20} height={15} alt="" />
            <span className="foodItemRating">{item.rating}</span>
          </div>

          {addBtn}
        </div>
      </div>
    </>
  );
};

export default Fooditemdetail;
