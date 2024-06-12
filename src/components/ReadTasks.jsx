import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import Task from "./Task";
import SearchInput from "./SearchInput";

const ReadTasks = () => {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  return (
    <div>
      <Link to={`/`}>Back</Link>
      <h5>ReadTasks</h5>
      <SearchInput search={search} setSearch={setSearch} />
      {tasks
        .filter((task) => task.name.toLowerCase().includes(search))
        .map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      <Link to={`/createtask`}>
        <button>Create Task</button>
      </Link>
    </div>
  );
};

export default ReadTasks;
