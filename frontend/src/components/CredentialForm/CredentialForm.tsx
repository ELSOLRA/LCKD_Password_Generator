import React from "react";
import "./credentialForm.scss";
import HidePassword from "../../assets/actions/hide-password-button.png";
import GenerateButton from "../../assets/actions/generate-button.png";

interface CredentialFormProps {
  wwwLabel?: string;
  usernameLabel: string;
  passwordLabel: string;
  wwwPlaceholder?: string;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  showGenerateButton?: boolean;
}

const CredentialForm: React.FC<CredentialFormProps> = ({
  wwwLabel,
  usernameLabel,
  passwordLabel,
  wwwPlaceholder = "",
  usernamePlaceholder = "",
  passwordPlaceholder = "",
  showGenerateButton = false,
}) => {
  return (
    <form className="credential-form">
      {wwwLabel && (
        <div className="input-group">
          <label htmlFor="www">{wwwLabel}</label>
          <input type="text" id="www" placeholder={wwwPlaceholder} />
        </div>
      )}
      <div className="input-group">
        <label htmlFor="username">{usernameLabel}</label>
        <input type="text" id="username" placeholder={usernamePlaceholder} />
      </div>
      <div className="input-group">
        <label htmlFor="password">{passwordLabel}</label>
        <div className="password-wrapper">
          <input
            type="password"
            id="password"
            placeholder={passwordPlaceholder}
          />
          {showGenerateButton ? (
            <span
              className="generate-password"
              onClick={() => {
                /* Add logic to generate password */
              }}
            >
              <img src={GenerateButton} alt="Generate Password" />
            </span>
          ) : (
            <span
              className="toggle-password"
              onClick={() => {
                /* Add logic to toggle password visibility */
              }}
            >
              <img src={HidePassword} alt="Hide Password" />
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;
