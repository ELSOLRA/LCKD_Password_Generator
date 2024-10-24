import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/LCKD-logo.png";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="LCKD Logo" className="header__logo" />
      <h1 className="header__title">LCKD</h1>
    </header>
  );
};

export default Header;
