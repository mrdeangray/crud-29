import React from "react";
import "./radio-btns-styles.css"


const RadioButtons = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="radio-btn-group">

      <div className="radio-btn-row">
      {options.map((option, index) => {
        return (
          <button
            className="radio-btn"
            key={index}
            value={option}
            style={
              selectedOption === option
                ? { backgroundColor: "blue",
                    color:"white"
                 }
                : { backgroundColor: "lightblue" }
            }
          
            onClick={() => setSelectedOption(option)}
          >
            {option}{" "}
          </button>
        );
      })}
    </div>
    </div>
  );
};

export default RadioButtons;
