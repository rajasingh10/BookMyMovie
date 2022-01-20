import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // npm install react-bootstrap bootstrap@5.1.3
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import allActions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  // const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const history = useHistory();
  const handleSignIn = () => {
    history.push("/");
  };
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  // const [loginUser, setLoginUser] = useState("");

  const check_login = async () => {
    console.log("login");
    if (emailLog && passwordLog) {
      axios
        .post("http://localhost:3002/check-log", {
          email: emailLog,
          password: passwordLog,
        })
        .then((response) => {
          // alert(response.data.message);
          if (response.data.message === "LogedIn") {
            dispatch(allActions.userActions.setUser(response.data.data[0]));
            handleSignIn();
          } else {
            alert(response.data.message);
          }
        });
    }
  };

  const check_exists = () => {
    // console.log("check");
    if (emailLog && passwordLog) {
      axios
        .post("http://localhost:3002/check-reg", {
          email: emailLog,
        })
        .then((response) => {
          const message = response.data.message;
          if (message === "Already") {
            check_login();
          }

          if (message === "New Registration") {
            alert("You are not Registered");
          }
        });
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="form-container sign-in-container">
          <div className="login_form">
            <h1 className="login_title ">Sign in</h1>
            <p className="forgot_pass">Or use your account</p>
            <input
              name="email"
              placeholder="Email"
              type="email"
              required
              value={emailLog}
              onChange={(e) => setEmailLog(e.target.value)}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
              value={passwordLog}
              onChange={(e) => setPasswordLog(e.target.value)}
            />
            <a href="#" className="forgot_pass">
              Forgot your password?
            </a>
            <button className="register_btn" onClick={check_exists}>
              Sign In
            </button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="login_title">Don't have an account?</h1>
              <p className="login_desc">
                Register and start your journey with us
              </p>
              <Link to="/register">
                <button className="login_btn">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
