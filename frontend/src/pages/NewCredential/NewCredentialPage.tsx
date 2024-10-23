import React from "react";
import Header from "../../components/Header/Header";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import "./newCredentialPage.scss";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import OptionsComponent from "../../components/Options/OptionsComponent";

const NewCredentials: React.FC = () => {
  return (
    <div className="new-credentials-container">
      <Header />
      <h2>NEW SECURE CREDENTIALS</h2>
      <CredentialForm
        wwwLabel="WWW"
        usernameLabel="USERNAME"
        passwordLabel="SECURE PASSWORD"
        wwwPlaceholder="www.tickster.com"
        usernamePlaceholder="sixten.svensson"
        passwordPlaceholder="H4kunam4t4t4!"
        showGenerateButton={true} // Show generate button
      />
      <OptionsComponent />
      <SubmitButton
        text="Submit"
        onClick={() => {
          /* handle submit logic */
        }}
      />
    </div>
  );
};

export default NewCredentials;
