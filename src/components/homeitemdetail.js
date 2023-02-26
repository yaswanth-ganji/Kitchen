import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import rupee from "../icons/rupee.svg";
import Cookie from "js-cookie";
import rating from "../icons/ratingwhite.svg";
import "../styles/homeitemdetail.css";
import Fooditem from "./fooditems";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Navigate } from "react-router-dom";
import frame from "../icons/frame.jpg";
const Homeitemdetail = () => {
  const params = useParams();
  const [isLoader, setIsLoader] = useState(true);
  const [itemDetails, setitemDetails] = useState();
  useEffect(() => {
    getitemDetails();
  }, []);

  const getitemDetails = () => {
    const JwtToken = Cookie.get("swiggyjwtToken");
    let url = `https://apis.ccbp.in/restaurants-list/${params.id}`;
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonbody) => {
        console.log(jsonbody);
        setitemDetails(jsonbody);
        setIsLoader(false);
      })
      .catch((err) => {
        setIsLoader(true);
      });
  };

  if (itemDetails) {
    console.log(itemDetails);
    itemDetails.food_items.map((eachItem) => {
      localStorage.setItem(eachItem.id, JSON.stringify(eachItem));
    });
    var companyDetails = {
      costForTwo: itemDetails.cost_for_two,
      cuisine: itemDetails.cuisine,
      location: itemDetails.location,
      companyName: itemDetails.name,
      openTime: itemDetails.opens_at,
      rating: itemDetails.rating,
      reviews: itemDetails.reviews_count,
    };
    localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
  }

  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      {isLoader ? (
        <div className="loaderDiv">
          <Loader type="TailSpin" color="#f7931e" height={60} width={60} />
        </div>
      ) : (
        <div>
          <div
            className="itemDetailMainDiv"
            style={{ backgroundImage: `url(${frame})` }}
          >
            <div className="itemDetailImgMain">
              <img
                src={itemDetails.image_url}
                width={445}
                height={280}
                alt=""
                className="homeItemdetailImg"
              />
              <div className="detailsDiv">
                <p className="itemDetailName">{itemDetails.name}</p>
                <p className="itemDetailcuisine">{itemDetails.cuisine}</p>
                <p className="itemDetailLocation">{itemDetails.location}</p>

                <div className="ratingandcostDiv">
                  <div className="ratingfirstDiv">
                    <div className="ratingimgDiv">
                      <img src={rating} width={20} height={12} alt="" />
                      <span className="ratingSpan">{itemDetails.rating}</span>
                    </div>
                    <span className="reviewsSpan">
                      {itemDetails.reviews_count}+ Ratings
                    </span>
                  </div>
                  <div className="ratingSecDiv">
                    <div className="ratingimgDiv">
                      <img src={rupee} width={20} height={12} alt="" />
                      <span className="costSpan">
                        {itemDetails.cost_for_two}
                      </span>
                    </div>

                    <span className="costLabel">cost for two</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="foodItemDiv">
            <Fooditem itemdetails={itemDetails} />
          </div>
          <div className="footerDiv">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Homeitemdetail;
