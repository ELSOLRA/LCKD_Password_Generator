import React from "react";
import Header from "../../components/Header/Header";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import "./newCredentialPage.scss";

const NewCredentials: React.FC = () => {
  return (
    <div className="new-credentials">
      <Header />
      <h2>NEW SECURE CREDENTIALS</h2>
      <CredentialForm />
    </div>
  );
};

export default NewCredentials;
