import React from "react";
import logo from "../../assets/logo/LCKD-logo.png"; // Adjust the path as necessary
import "./hero.scss";

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <img src={logo} alt="LCKD Logo" className="hero__logo" />
    </div>
  );
};

export default Hero;
