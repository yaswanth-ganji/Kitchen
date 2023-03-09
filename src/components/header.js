import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Applogo from "../icons/applogo.svg";
import "../styles/header.css";
import LogoutModel from "./LogoutModel";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
const Header = () => {
  const [Open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const gotoHome = () => {
    Navigate("/");
  };
  const MainLogout = () => {
    Cookie.remove("swiggyjwtToken");
    Navigate("/login");
    setOpen(false);
  };
  const logout = () => {
    setOpen(true);
  };
  const showNav = () => {
    var x = document.getElementById("NavBar");
    x.classList.remove("hide");
    x.classList.add("show");
  };
  const removeNavBar = () => {
    var y = document.getElementById("NavBar");
    y.classList.remove("show");
    y.classList.add("hide");
  };
  const spanDivContainer = (
    <div className="spanDiv">
      <NavLink to="/" className="navlink">
        Home
      </NavLink>

      <NavLink to="/Cart" className="navlink">
        Cart
      </NavLink>
      <NavLink to="/Wallet" className="navlink">
        Wallet
      </NavLink>
      <button className="logoutBtn" onClick={logout}>
        Logout
      </button>
    </div>
  );
  return (
    <>
      <div className="headerDiv">
        <div className="headerDiv1">
          <div
            className="headerLogoDiv"
            style={{ cursor: "pointer" }}
            onClick={gotoHome}
          >
            <img src={Applogo} width={49} height={39} alt="" />
            <p className="heading">Tasty Kitchen</p>
          </div>

          <div className="spanDivMain">{spanDivContainer}</div>
          <button className="logoutBtn barsIcon" onClick={showNav}>
            <FaBars />
          </button>
        </div>
      </div>
      <div>
        <div className="spanDivMain1" id="NavBar">
          <div className="spanDiv1">
            {spanDivContainer}

            <div onClick={removeNavBar} className="removeNavDiv">
              <FaTimes />
            </div>
          </div>
        </div>
      </div>
      <div>
        <LogoutModel
          message="Are you sure that you want to Logout?"
          isOpen={Open}
          onClose={() => setOpen(false)}
          onLogOut={MainLogout}
          btnNo="No"
          btnYes="Yes"
        />
      </div>
    </>
  );
};

export default Header;
