import React from "react";
import SignInButton from "../../components/Sign-In-Button/Sign-In-Button";
import Hero from "../../components/Hero/Hero";
import "./login.scss";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const Login: React.FC = () => {
  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Button clicked!");
  };

  return (
    <div className="login credential-form-container">
      <Hero />
      <SignInButton />
      <div className="login__content">
        <h1>LCKD</h1>
        <h2>KEEPING YOUR PASSWORDS SAFE</h2>
        <CredentialForm usernameLabel="Username" passwordLabel="Password" />
        <SubmitButton text="LET ME IN" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
