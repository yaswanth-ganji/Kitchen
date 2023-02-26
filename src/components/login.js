import React from "react";
import Cookie from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import LoginImg from "../icons/loginimg.jpg";
import Applogo from "../icons/applogo.svg";
import { Navigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const onUsernameChange = (e) => {
    setusername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    Apicalling();
  };
  const Apicalling = async () => {
    var userDetails = { username, password };
    let options = {
      method: "POST",
      header: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const res = await fetch("https://apis.ccbp.in/login", options);
    const jsonBody = await res.json();

    if (res.ok === true) {
      Cookie.set("swiggyjwtToken", jsonBody.jwt_token, { expires: 30 });

      navigate("/");
      seterror(false);
      console.log(jsonBody);
    } else {
      seterror(true);
      seterrorMsg(jsonBody.error_msg);
    }
  };

  const JwtToken = Cookie.get("swiggyjwtToken");
  if (JwtToken !== undefined) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="loginBody">
        <form className="loginForm" onSubmit={onFormSubmit}>
          <div className="loginDiv">
            <img src={Applogo} width={49} height={39} alt="" />
            <p className="heading">Tasty Kitchen</p>

            <p className="headingLogin">Login</p>

            <div className="labelDiv">
              <label for="userinp">USERNAME</label>
            </div>

            <input type="text" id="userinp" onChange={onUsernameChange} />
            <div className="labelDiv">
              <label for="passinp">PASSWORD</label>
            </div>

            <input id="passinp" type="password" onChange={onPasswordChange} />
            <div style={{ width: "364px" }}>
              {error && <p className="errormsg">{errorMsg}</p>}
            </div>
            <button>Login</button>
          </div>
        </form>
        <div className="imgDiv">
          <img src={LoginImg} alt="" />
        </div>
      </div>
    </>
  );
};
export default Login;
