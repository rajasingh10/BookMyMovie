import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // npm install react-bootstrap bootstrap@5.1.3
import "../styles/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    console.log("register");
    if (usernameReg && emailReg && passwordReg) {
      axios
        .post("http://localhost:3002/register", {
          username: usernameReg,
          email: emailReg,
          password: passwordReg,
        })
        .then((response) => {
          alert(response.data.message);
        });
    }
  };

  const check_exists = () => {
    console.log("check");
    if (usernameReg && emailReg && passwordReg) {
      axios
        .post("http://localhost:3002/check-reg", {
          email: emailReg,
        })
        .then((response) => {
          const message = response.data.message;
          if (message === "Already") {
            alert("Already register");
          }

          if (message === "New Registration") {
            register();
          }
        });
    }
    setEmailReg("");
    setPasswordReg("");
    setUsernameReg("");
  };

  return (
    <div className="register">
      <div className="container">
        <div className="form-container register-container">
          <div className="register_form">
            <h1 className="register_title mb-4">Register</h1>
            <input
              type="text"
              name="name"
              required
              placeholder="Username"
              value={usernameReg}
              onChange={(e) => setUsernameReg(e.target.value)}
            />
            <input
              name="email"
              placeholder="Email"
              required
              type="email"
              value={emailReg}
              onChange={(e) => setEmailReg(e.target.value)}
            />

            <input
              name="password"
              placeholder="Password"
              required
              type="password"
              value={passwordReg}
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <button className="register_btn mt-3" onClick={check_exists}>
              register
            </button>
          </div>
        </div>
        <div className="reg-overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="register_title">Already have an account?</h1>
              <p className="register_desc">
                To keep connected with us please login with your personal info
              </p>
              <Link to="/login">
                <button className="login_btn">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
