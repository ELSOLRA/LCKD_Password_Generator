// OptionsComponent.tsx
import React from "react";
import "./optionsComponent.scss"; // Import your CSS file

const OptionsComponent = () => {
  const handleClick = (option: string) => {
    console.log(`Clicked on: ${option}`);
    // Add your logic here (e.g., updating state, triggering an action, etc.)
  };

  return (
    <div className="options-container">
      <span className="option" onClick={() => handleClick("#")}>
        #
      </span>
      <span className="option" onClick={() => handleClick("@")}>
        @
      </span>
      <span className="option" onClick={() => handleClick("123")}>
        123
      </span>
      <span className="option" onClick={() => handleClick("Aa")}>
        Aa
      </span>
      <span className="option red" onClick={() => handleClick("pwnd")}>
        pwnd
      </span>
    </div>
  );
};

export default OptionsComponent;
