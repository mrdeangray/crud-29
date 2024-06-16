import React from "react";

const CheckIcon = ({className}) => {
  return (
    <div className="check-icon-container">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        // height="1em"
        // width="100%"
        xmlns="http://www.w3.org/2000/svg"
        // style="font-size: 1.3rem;"
      >
        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>
    </div>
  );
};

export default CheckIcon;
