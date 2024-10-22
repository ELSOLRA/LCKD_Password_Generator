import React from "react";
import Header from "../../components/Header/Header";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import "./newCredentialPage.scss";

const NewCredentials: React.FC = () => {
  const handleSubmit = (data: {
    www: string;
    username: string;
    password: string;
  }) => {
    console.log("New Credential Data:", data);
    // Handle the submission logic here
  };

  return (
    <div className="new-credentials">
      <Header />
      <h2>NEW SECURE CREDENTIALS</h2>
      <CredentialForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewCredentials;
