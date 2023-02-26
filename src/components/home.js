import React from "react";
import Footer from "./footer";
import Header from "./header";
import Corosal from "./homeCorosal";
import Cookie from "js-cookie";
import sort from "../icons/sort.svg";
import "../styles/home.css";
import { useState, useEffect } from "react";
import Homeitems from "./homeitems";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import leftArrow from "../icons/left.svg";
import rightArrow from "../icons/right.svg";
import downArrow from "../icons/downarrow.svg";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [homeItemslist, sethomeItemslist] = useState([]);
  const [isLoader, setisLoader] = useState(true);
  const [dropDownData, setdropDownData] = useState("");
  const [limit, setLimit] = useState(9);
  const [getdownArrow, setgetdownArrow] = useState(false);
  const [pagination, setpagination] = useState(true);
  const [searchData, setsearchData] = useState("");
  const [apiStatus, setapiStatus] = useState();
  // const limit = 9;
  const [activePage, setactivePage] = useState(1);
  const offset = (activePage - 1) * limit;

  const nextPage = () => {
    if (activePage < 3) {
      setactivePage(activePage + 1);
    }
  };
  const prevPage = () => {
    if (activePage > 1) {
      setactivePage(activePage - 1);
    }
  };
  const dropDownStore = (e) => {
    if (e.target.value === "Sort by Highest") {
      setdropDownData("Highest");
      setgetdownArrow(true);
    } else if (e.target.value === "Sort by Lowest") {
      setdropDownData("Lowest");
      setgetdownArrow(true);
    }
  };
  const getsearchData = (e) => {
    console.log(e.target.value);
    setsearchData(e.target.value);
  };
  const changeLimit = () => {
    setpagination(false);
    setLimit(30);
    setgetdownArrow(false);
    setactivePage(1);
  };

  useEffect(() => {
    getHomeItems();
  }, []);
  useEffect(() => {
    getHomeItems();
  }, [activePage]);
  useEffect(() => {
    getHomeItems();
  }, [dropDownData, limit]);

  const getHomeItems = () => {
    const JwtToken = Cookie.get("swiggyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };
    let url;

    if (searchData === "") {
      url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${dropDownData}`;
    } else if (searchData) {
      url = `https://apis.ccbp.in/restaurants-list?search=${searchData}`;
    }

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        console.log(jsonBody);
        sethomeItemslist(jsonBody.restaurants);
        setisLoader(false);
        setapiStatus(true);
      })
      .catch((err) => {
        console.log("failed");
        setisLoader(true);
        setapiStatus(false);
      });
  };
  const searchRestaurants = (e) => {
    e.preventDefault();
    if (searchData) {
      getHomeItems();
      setpagination(false);
    }
  };

  const HomeItems = homeItemslist.map((eachItem) => {
    return (
      <Homeitems
        details={eachItem}
        ratingColor={eachItem.user_rating.rating_color}
      />
    );
  });
  var data;
  if (apiStatus === false) {
    data = <div>no restaurants</div>;
  } else if (apiStatus === true)
    data = (
      <div className="homeListContainer">
        <div className="homeitemsList">{HomeItems}</div>
      </div>
    );
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
        <div className="homeMain">
          <Corosal />
          <div className="searchBarDiv">
            <p className="searchbarHeader">Popular Restaurants</p>

            <form className="searchBarForm" onSubmit={searchRestaurants}>
              <input
                placeholder="Select your favourite restaurant special dish and make your day happy..."
                onChange={getsearchData}
              />
              <button className="searchBtn" type="submit">
                Search
              </button>

              <div className="dropdownEleDiv">
                <img src={sort} width={24} height={24} alt="" />
                <select className="dropDownEle" onChange={dropDownStore}>
                  <option>Sort</option>
                  <option>Sort by Lowest</option>
                  <option>Sort by Highest</option>
                </select>
              </div>
            </form>
          </div>
          {data}
          {getdownArrow && (
            <div className="downArrowDiv" onClick={changeLimit}>
              <img src={downArrow} width={40} height={30} alt="" />
            </div>
          )}
          {pagination && (
            <div className="paginationDiv">
              <img
                src={leftArrow}
                width={40}
                height={30}
                onClick={prevPage}
                alt=""
              />
              <div className="paginationSubDiv">
                <span>{activePage} of 3</span>
              </div>
              <img
                src={rightArrow}
                width={40}
                height={30}
                onClick={nextPage}
                alt=""
              />
            </div>
          )}
          <div className="footerDiv">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
