import React from "react";
import "./category-input-styles.css";

const CategoryInput = ({ placeholder, value, setValue }) => {
  return (
    <input
      className="category-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CategoryInput;
