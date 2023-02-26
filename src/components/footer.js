import React from "react";
import facebook from "../icons/fb.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/insta.svg";
// import whatsapp from "../icons/whatsapp.svg";

import footerlogo from "../icons/footerlogo.svg";
import productHunt from "../icons/productHunt.svg";
import "../styles/footer.css";
const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div className="footerHeader">
          <div className="headerLogoDiv">
            <img src={footerlogo} width={49} height={39} alt="" />
            <p className="heading">Tasty Kitchen</p>
          </div>
        </div>

        <span>The only thing we are serious about is food</span>
        <span>Contact us on</span>
        <div className="footerLogoDiv">
          <img src={productHunt} width={40} height={40} alt="" />
          <img src={instagram} width={40} height={40} alt="" />
          <img src={twitter} width={40} height={40} alt="" />
          <img src={facebook} width={40} height={40} alt="" />
        </div>
      </div>
    </>
  );
};

export default Footer;
