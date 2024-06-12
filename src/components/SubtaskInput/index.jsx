import React from "react";
import RemoveIcon from "./RemoveIcon";

const SubtaskInput = ({ value, setValue, handleRemove, handleAdd, index }) => {
  return (
    <div>
      <input
        autoFocus
        type="text"
        placeholder="Subtask"
        value={value}
        onChange={(e) => setValue(e, index)}
      />
      ;
      <button onClick={() => handleRemove(index)}>
        <RemoveIcon />
      </button>
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default SubtaskInput;
