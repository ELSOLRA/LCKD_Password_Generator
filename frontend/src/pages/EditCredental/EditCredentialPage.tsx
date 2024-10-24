import React from "react";
import Header from "../../components/Header/Header";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import "./editCredentialPage.scss";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import OptionsComponent from "../../components/Options/OptionsComponent";

const EditCredentialPage: React.FC = () => {
  return (
    <div className="edit-credentials-container">
      <Header />
      <h2>EDIT SECURE CREDENTIALS</h2>
      <CredentialForm
        wwwLabel="WWW"
        usernameLabel="USERNAME"
        passwordLabel="SECURE PASSWORD"
        wwwPlaceholder="www.tickster.com"
        usernamePlaceholder="sixten.svensson"
        passwordPlaceholder="H4kunam4t4t4!"
        showGenerateButton={true}
      />
      <OptionsComponent />
      <SubmitButton
        text="Save Changes"
        onClick={() => {
          /* handle save logic */
        }}
      />
    </div>
  );
};

export default EditCredentialPage;
