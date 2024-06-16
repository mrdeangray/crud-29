import React from "react";
import "./progressbar-styles.css";

const ProgressBar = ({percentCompleted}) => {
  return (
    <div className="progressbar-container">
      <div 
      className="progressbar-filler"
      style={{width: `${percentCompleted}%`}}
      >
        <span className="progressbar-label">{percentCompleted}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
