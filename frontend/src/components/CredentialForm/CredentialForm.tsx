import React from "react";
import "./credentialForm.scss";
import showPassword from "../../assets/actions/show-password-button.png";

const CredentialForm: React.FC = () => {
  return (
    <form className="credential-form">
      <div className="input-group">
        <label htmlFor="username">USERNAME</label>
        <input type="text" id="username" placeholder="sixten.svensson" />
      </div>
      <div className="input-group">
        <label htmlFor="password">PASSWORD</label>
        <div className="password-wrapper">
          <input type="password" id="password" placeholder="••••••••" />
          <span className="toggle-password">
            <img src={showPassword} alt="" />
          </span>{" "}
          {/* Placeholder for the icon */}
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;
