import React, { useRef } from "react";
import Header from "./header";
import "../styles/complaints.css";
import Footer from "./footer";
import { useState } from "react";
import emailjs from "emailjs-com";
const Complaint = () => {
  const form = useRef();
  const [data, setdata] = useState({
    userName: "",
    email: "",
    message: "",
    suggestion: "",
    restaurant: "",
    item: "",
  });
  const [error, seterror] = useState(false);
  const onInputChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (
      data.userName === "" ||
      data.email === "" ||
      data.message === "" ||
      data.restaurant === "" ||
      data.item === ""
    ) {
      console.log(data);
      seterror(true);
    } else {
      console.log(data);
      seterror(false);
      emailjs
        .sendForm(
          "service_e1vtzql",
          "template_hlheg85",
          form.current,
          "s9-MdEkO7IhG2TjP4"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      alert(
        "Complaint Registered Successfully! Owner will get back to you soon."
      );
    }

    e.target.reset();
    setdata({
      userName: "",
      email: "",
      message: "",
      suggestion: "",
      restaurant: "",
      item: "",
    });
  };

  return (
    <div>
      <Header />
      <div>
        <div className="FormDiv">
          <form ref={form} className="formEle" onSubmit={onFormSubmit}>
            <div className="formContent">
              {error && (
                <span style={{ color: "red" }}>
                  ***Please Enter the Required Details
                </span>
              )}
              <h3>Complaints? Let us Know</h3>
              <label>Name</label>
              <input
                name="userName"
                placeholder="Enter your name"
                onChange={onInputChange}
              />

              <label>Email</label>
              <input
                placeholder="Enter your email"
                onChange={onInputChange}
                name="email"
              />
              <label>Which Restaurant</label>
              <input
                placeholder="Name of the Restaurant"
                name="restaurant"
                onChange={onInputChange}
              />
              <label>Which Dish</label>
              <input
                placeholder="Name of the Dish"
                name="item"
                onChange={onInputChange}
              />
              <label>What has happened?</label>

              <textarea
                rows="2"
                cols="100"
                placeholder="Please tell us about the incident including as many details as possible."
                onChange={onInputChange}
                name="message"
              ></textarea>

              <div>
                <label>How can we make things right?</label>
                <span className="optionalSpan"> (Optional)</span>
              </div>
              <input onChange={onInputChange} name="suggestion" />
              <button type="submit">SEND</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Complaint;
