import React from "react";
import rating from "../icons/rating.svg";
import "../styles/homeitems.css";
import { NavLink } from "react-router-dom";

const Homeitems = ({ details }) => {
  return (
    <>
      <NavLink to={`/${details.id}`} className="homeItemMainContainer">
        <div className="homeItemMain">
          <div className="homeItemMainImgDiv">
            <img
              src={details.image_url}
              width={180}
              height={145}
              alt=""
              className="homeItemImg"
            />
          </div>
          <div className="homeItemMainspanDiv">
            <span className="itemname">{details.name}</span>
            <span className="itemcuisine">{details.cuisine}</span>
            <div className="ratingDiv">
              <img src={rating} width={15} height={15} alt="" />
              <span className="itemRating">
                {/* style={{ color: `#${ratingColor}` }} */}
                {details.user_rating.rating}
              </span>
              <span className="itemReviews">
                ({details.user_rating.total_reviews} ratings)
              </span>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default Homeitems;
