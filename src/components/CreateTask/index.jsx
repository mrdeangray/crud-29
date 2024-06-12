import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskProvider";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import RadioButtons from "../RadioButtons";
import TaskNameInput from "../TaskNameInput";
import BackBtn from "../BackBtn";
import "./create-task.styles.css";
import SubtaskInput from "../SubtaskInput";

const Msg = styled.p`
  font-size: 20px;
  color: red;
`;
const CreateTask = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpating] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([{}]);
  const [complexity, setComplexity] = useState("2");
  const [priority, setPriority] = useState("2");
  const [dateTime, setDateTime] = useState(new DateObject());
  const [category, setCategory] = useState("");

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
    <div className="create-task">
      <header>
        <Link to={`/readtasks`}>
          <BackBtn />
        </Link>
        <h1>Add New Task</h1>
      </header>

      <TaskNameInput
        placeholder="Task"
        value={taskName}
        setValue={setTaskName}
      />

      <RadioButtons
        options={["1", "2", "3"]}
        selectedOption={priority}
        setSelectedOption={setPriority}
        title="Select Priority Level"
      />
      <RadioButtons
        options={["1", "2", "3"]}
        selectedOption={priority}
        setSelectedOption={setPriority}
        title="Select Priority Level"
      />

      <section className="date-time-section">
        <label htmlFor="datetime">Due Date and Time</label>
        <DatePicker
          id="datetime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[<TimePicker position="bottom" />]}
        />
      </section>
      <section className="subtasks-section">
        <label htmlFor="subtasks">Add Checklist For Subtasks </label>
        <div className="sub-task">
          {subtasks.map((subtask, index) => {
            return (
              <SubtaskInput
                value={subtask.name}
                setValue={handleChange}
                handleRemove={handleRemove}
                handleAdd={handleAdd}
                index={index}
              />
            );
          })}
        </div>
      </section>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default CreateTask;
