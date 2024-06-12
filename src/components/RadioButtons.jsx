import React from "react";


const RadioButtons = ({
  options,
  selectedOption,
  setSelectedOption,
  title,
}) => {
  return (
    <div className="radio-btn-group">
      <p>{title}: </p>
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
            backgroundColor={selectedOption === option ? "blue" : "lightblue"}
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
