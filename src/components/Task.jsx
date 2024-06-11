import React from "react";

const Task = ({ task }) => {
  return (
    <div>
      <span>{task.name}</span>
    </div>
  );
};

export default Task;
