import React from "react";
import SignInButton from "../../components/Sign-In-Button/Sign-In-Button";
import Hero from "../../components/Hero/Hero"; // Import the Hero component
import "./login.scss";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import SubmitButton from "../../components/SubmitButton/SubmitButton"; // Import the SubmitButton

const Login: React.FC = () => {
  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Button clicked!");
  };

  return (
    <div className="login">
      <Hero /> {/* Use the Hero component */}
      <SignInButton />
      <div className="login__content">
        <h1>LCKD</h1>
        <h2>KEEPING YOUR PASSWORDS SAFE</h2>
        <CredentialForm />
        <SubmitButton text="LET ME IN" onClick={handleSubmit} />{" "}
      </div>
    </div>
  );
};

export default Login;
