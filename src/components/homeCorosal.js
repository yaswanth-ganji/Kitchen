import React from "react";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import "../styles/homecorosal.css";
const Corosal = () => {
  const [CorosalImages, setCorosalImages] = useState([]);

  useEffect(() => {
    getCorosalImages();
  }, []);

  const getCorosalImages = () => {
    const JwtToken = Cookie.get("swiggyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };

    fetch("https://apis.ccbp.in/restaurants-list/offers", options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        setCorosalImages(jsonBody.offers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const corosalNum = CorosalImages.map((eachItem) => {
    if (eachItem.id === 1) {
      return (
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={eachItem.id - 1}
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      );
    } else {
      return (
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={eachItem.id - 1}
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      );
    }
  });

  const Corosal = CorosalImages.map((eachItem) => {
    if (eachItem.id === 1) {
      return (
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src={eachItem.image_url}
            alt={eachItem.id}
          ></img>
        </div>
      );
    } else {
      return (
        <div class="carousel-item ">
          <img
            class="d-block w-100"
            src={eachItem.image_url}
            alt={eachItem.id}
          ></img>
        </div>
      );
    }
  });
  return (
    <div className="CorosalDiv">
      <div
        id="carouselExampleIndicators"
        class="carousel slide CorosalDiv1"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">{corosalNum}</div>
        <div class="carousel-inner">{Corosal}</div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Corosal;
