import React from "react";
import Header from "../../components/Header/Header"; // Import Header
import PasswordList from "../../components/PasswordList/PasswordList";
import "./dashboard.scss";

const DashboardPage: React.FC = () => {
  const passwords = [
    "www.google.com",
    "www.facebook.com",
    "www.twitter.com",
    "www.kommunikar...",
    "www.illuminati.org",
  ];

  return (
    <div className="dashboard">
      <Header />
      <h2>STORED PASSWORDS</h2>
      <PasswordList passwords={passwords} />
      <button className="new-credential-button">NEW LCKD</button>
    </div>
  );
};

export default DashboardPage;
