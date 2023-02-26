import React from "react";
import Header from "./header";
import { useParams } from "react-router-dom";
import "../styles/fooditemindividual.css";
import rating from "../icons/rating.svg";
import rupee from "../icons/rupee1.svg";
import { useCart } from "react-use-cart";
import { useNavigate, Navigate } from "react-router-dom";
import payment from "../icons/payment.svg";
import Cookie from "js-cookie";
const Fooditemindividual = () => {
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const Params = useParams();
  var companyDetails = localStorage.getItem("companyDetails");
  var useCompanyDetails = JSON.parse(companyDetails);
  console.log(useCompanyDetails);

  var data = localStorage.getItem(Params.id);
  var useData = JSON.parse(data);
  console.log(useData);

  const cartDetails = {
    id: Params.id,
    image: useData.image_url,
    name: useData.name,
    price: useData.cost,
  };
  const gotocart = () => {
    navigate("/cart");
  };
  const addtocart = () => {
    console.log(items);
    addItem(cartDetails);
  };

  var x = items.map((eachItem) => {
    return eachItem.id;
  });
  var addBtn;
  var NextBtn;
  if (x.includes(Params.id)) {
    addBtn = (
      <div className="AddSpanDiv">
        <img src={payment} width={40} height={30} alt="" />
        <span className="AddedSpan">Added </span>
      </div>
    );
    NextBtn = (
      <button className="NextBtn1" onClick={gotocart}>
        Next
      </button>
    );
  } else {
    addBtn = (
      <button className="useData-AddBtn" onClick={addtocart}>
        Add
      </button>
    );
  }

  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="foodItemIndividual-Main">
        <div className="HeaderMain">
          <Header />
        </div>

        <div className="foodItemIndividual1A">
          <div className="foodItemIndividual1">
            <img
              src={useData.image_url}
              width={450}
              height={300}
              alt=""
              className="MainImgIndividual"
            />

            <div className="foodItemIndividual2">
              <h1 className="useData-heading1">{useData.name}</h1>
              <div className="useData-foodtype1">
                {useData.food_type}
                <span className="cuisineSpan1">
                  ({useCompanyDetails.cuisine})
                </span>
              </div>
              <div className="useData-ratingMain">
                <img src={rating} width={25} height={15} alt="" />
                <span className="useData-rating1">{useData.rating}</span>
              </div>
              <div className="useData-priceMain1">
                <img src={rupee} width={15} height={10} alt="" />
                <span className="useData-price1">{useData.cost}/-</span>
              </div>
              <div>{addBtn}</div>
            </div>
          </div>
          <div className="companyDetailsMain1">
            <div className="companyDetailsMain11A">
              <h3 className="CompanyDetails-comapnyName1">
                {useCompanyDetails.companyName}
              </h3>

              <span className="CompanyDetails-cuisine1">
                {useCompanyDetails.cuisine}
              </span>
              <span className="CompanyDetails-location1">
                {useCompanyDetails.location}
              </span>
              <div className="CompanyDetails-Rating1">
                <div
                  style={{ borderRight: "1px solid #334155", width: "100px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "9px",
                    }}
                  >
                    <img src={rating} width={17} height={14} alt="" />
                    <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                      {useCompanyDetails.rating}
                    </span>
                  </div>

                  <span className="ReviewSpan">
                    {useCompanyDetails.reviews}+ Ratings
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingLeft: "23px",
                  }}
                >
                  <span className="CompanyDetails-cost21">
                    <img src={rupee} width={15} height={10} alt="" />
                    <span style={{ fontWeight: "700", marginLeft: "2px" }}>
                      {useCompanyDetails.costForTwo}/-
                    </span>
                  </span>
                  <span>cost for two</span>
                </div>
              </div>

              <span className="CompanyDetails-openAt1">
                open at: {useCompanyDetails.openTime}
              </span>
            </div>
          </div>
          <div className="NextBtn1A">{NextBtn}</div>
        </div>
      </div>
    </>
  );
};

export default Fooditemindividual;
