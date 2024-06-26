import React from "react";
import "./radio-toggle-switch-styles.css";

const RadioToggleSwitch = ({
  title,
  leftLabel,
  rightLabel,
  setCompleted,
  completed,
}) => {
  const handleChange = (e) => {
    setCompleted(str2bool(e.target.value))
  };

 const str2bool = (value) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
 }


  return (
    <div className="radio-btn-switch-container">
      <form className="radio-btn-switch">
        <input
          type="radio"
          id="switch_left"
          name="switchToggle"
          value={true}
          onChange={(e) => handleChange(e)}
          checked={completed=== true}
        />
        <label htmlFor="switch_left">{leftLabel}</label>

        <input
          type="radio"
          id="switch_right"
          name="switchToggle"
          value={false}
          onChange={(e) => handleChange(e)}
          checked={completed=== false}
        />
        <label htmlFor="switch_right">{rightLabel}</label>
      </form>
    </div>
  );
};

export default RadioToggleSwitch;
