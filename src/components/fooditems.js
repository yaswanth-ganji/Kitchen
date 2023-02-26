import React, { useState } from "react";
import Fooditemdetail from "./fooditemdetail";
import "../styles/fooditemdetail.css";
import { useNavigate } from "react-router-dom";

const Fooditem = ({ itemdetails }) => {
  const Navigate = useNavigate();
  const gotocart = () => {
    Navigate("/cart");
  };
  var AllItemDetails;

  AllItemDetails =
    itemdetails &&
    itemdetails.food_items &&
    itemdetails.food_items.length > 0 &&
    itemdetails.food_items.map((item) => {
      return <Fooditemdetail item={item} />;
    });

  return (
    <>
      <div className="foodItemList">
        {AllItemDetails}
        <div className="NextButton">
          <button onClick={gotocart}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Fooditem;
