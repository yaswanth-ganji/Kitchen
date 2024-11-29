import React from "react";
import Login from "./login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import Cart from "./cart";
import Homeitemdetail from "./homeitemdetail";
import Notfound from "./notfound";
import Payment from "./payment";
import Fooditemindividual from "./fooditemindividual";
import Wallet from "./wallet";
import Complaint from "./complaints";
class Swiggy extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/Wallet" element={<Wallet />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/Complaints" element={<Complaint />} />
          <Route exact path="/:id" element={<Homeitemdetail />} />
          <Route exact path="/items/:id" element={<Fooditemindividual />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Swiggy;
