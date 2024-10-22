import React from "react";
import Header from "../../components/Header/Header";
import SignInButton from "../../components/Sign-In-Button/Sign-In-Button";
import "./login.scss";

const Login: React.FC = () => {
  return (
    <div className="login">
      <Header />
      <div className="login__content">
        <h2>KEEPING YOUR PASSWORDS SAFE</h2>
        <input type="text" placeholder="USERNAME" />
        <input type="password" placeholder="PASSWORD" />
        <SignInButton />
        <button className="signup-button">Sign up</button>
      </div>
    </div>
  );
};

export default Login;
