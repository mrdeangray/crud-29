import React from "react";
import "./drop-down-menu-styles.css"

const DropDownMenu = ({
  options,
  selectedOption,
  setSelectedOption,
  title,
}) => {
  return (
    <div className="drop-down-menu">
      <select
        name=""
        id=""
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">{title}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownMenu;
