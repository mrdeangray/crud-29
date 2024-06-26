import React from "react";

const CheckIcon = ({ onClick, style, disabled }) => {
  return (
    <button
      className="check-icon-container"
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        stroke="black"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        // width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
      >
        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>
    </button>
  );
};

export default CheckIcon;
