import React from "react";
import "./submitButton.scss";

const SubmitButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button className="submit-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;
