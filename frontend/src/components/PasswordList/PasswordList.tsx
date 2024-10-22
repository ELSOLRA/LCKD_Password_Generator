import React from "react";
import "./passwordList.scss";

interface PasswordListProps {
  passwords: string[];
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords }) => {
  return (
    <ul className="password-list">
      {passwords.map((password, index) => (
        <li key={index} className="password-list__item">
          <span>{password}</span>
          <button className="password-list__edit">Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default PasswordList;
