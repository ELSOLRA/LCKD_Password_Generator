import React from "react";
import Header from "../../components/Header/Header";
import CredentialForm from "../../components/CredentialForm/CredentialForm";
import "./editCredentialPage.scss";

const EditCredentials: React.FC = () => {
  const handleSubmit = (data: {
    www: string;
    username: string;
    password: string;
  }) => {
    console.log("Updated Credential Data:", data);
    // Handle the update logic here
  };

  return (
    <div className="edit-credentials">
      <Header />
      <h2>EDIT YOUR CREDENTIALS</h2>
      <CredentialForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCredentials;
