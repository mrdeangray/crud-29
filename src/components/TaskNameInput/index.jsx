import React from "react";
import "./task-name-input-styles.css";

const TaskNameInput = ({ placeholder, value, setValue }) => {
  return (
    <input
      className="task-name-input"
      type="text"
      placeholder={placeholder}
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TaskNameInput;
