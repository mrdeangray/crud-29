import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const Msg = styled.p`
  font-size: 20px;
  color: red;
`;
const CreateTask = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpating] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [complexity, setComplexity] = useState("2")
  const [priority, setPriority] = useState("2")
  const [dateTime, setDateTime] = useState(new DateObject)

  const handleSubmit = () => {
    const newTask = {};
    newTask.id = uuid();
    newTask.name = taskName;
    newTask.subtasks = subtasks;
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("crud-29", JSON.stringify(newTasks));
    setIsUpating(true);
    setTimeout(() => {
      setIsUpating(false);
      navigate(`/readtasks`);
    }, 2000);
  };

  const handleAdd = () => {
    const newSubtasks = [...subtasks, { name: "", completed: false }];
    setSubtasks(newSubtasks);
  };
  const handleRemove = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleChange = (event, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].name = event.target.value;
    setSubtasks(newSubtasks);
  };

  return (
    <div>
      <Link to={`/readtasks`}>Back</Link>
      <h5>CreateTask</h5>
      <input
        type="text"
        placeholder="Task"
        autoFocus
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <div className="sub-task">
        {subtasks.map((subtask, index) => {
          return (
            <div>
              <input
                autoFocus
                type="text"
                placeholder="Subtask"
                value={subtask.name}
                onChange={(e) => handleChange(e, index)}
              />
              ;<button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          );
        })}
      </div>

      <DatePicker
        format="MM/DD/YYYY HH:mm:ss"
        plugins={[<TimePicker position="bottom" />]}
      />

      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSubmit}>Submit</button>
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default CreateTask;
