import React from "react";
import RemoveIcon from "./RemoveIcon";
import "./subtask-input-styles.css";
import PlusIcon from "./PlusIcon";

const SubtaskInput = ({
  inputValue,
  setInputValue,
  handleRemove,
  handleAdd,
  index,
  length,
}) => {
  return (
    <div className="subtask-input">
      <input
        autoFocus={length>1}
        type="text"
        placeholder="Subtask"
        value={inputValue}
        onChange={(e) => setInputValue(e, index)}
      />
      {index === length - 1 ? (
        <button
          disabled={!!inputValue ? false : true}
          onClick={handleAdd}
          className="add-btn"
        >
          <PlusIcon />
        </button>
      ) : (
        <button onClick={() => handleRemove(index)} className="remove-btn">
          <RemoveIcon />
        </button>
      )}
    </div>
  );
};

export default SubtaskInput;
