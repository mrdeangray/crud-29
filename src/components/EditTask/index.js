import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../../context/TaskProvider";
import styled from "styled-components";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import RadioButtons from "../RadioButtons";
import TaskNameInput from "../TaskNameInput";
import BackBtn from "../BackBtn";
import "./edit-task-styles.css";
import SubtaskInput from "../SubtaskInput";
import CategoryInput from "../CategoryInput";
import { RotatingLines } from "react-loader-spinner";
import { calcPercentComplete } from "../../utility/calcPercentComplete";

const Msg = styled.p`
  font-size: 20px;
  color: red;
`;
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpating] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", completed: false }]);
  const [complexity, setComplexity] = useState("2");
  const [priority, setPriority] = useState("2");
  const [dueDateTime, setDueDateTime] = useState(new DateObject());
  const [category, setCategory] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [task, setTask] = useState();

  useEffect(() => {
    const currTask = tasks.find((task) => task.id === id);
    setTask(currTask);
    setTaskName(currTask.name);
    setSubtasks(currTask.subtasks);
    setComplexity(currTask.complexity);
    setPriority(currTask.priority);
    setDueDateTime(currTask.dueDateTime);
    setCategory(currTask.category);
  }, [id, tasks]);

  const handleSubmit = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = taskName;
        task.dueDateTime = dueDateTime;
        task.priority = priority;
        task.complexity = complexity;
        task.subtasks = subtasks;
        task.percentCompleted = calcPercentComplete(subtasks);
        task.category = category;
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
    setIsUpating(true);
    setTimeout(() => {
      setIsUpating(false);
      navigate(`/`);
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

  const handleDateTimeSelected = (date) => {
    setDueDateTime(date);
    setIsDateSelected(true);
  };
  if (task) {
    return (
      <div className="create-task">
        <header>
          <Link to={`/`}>
            <BackBtn />
          </Link>
          <h1>Edit Task</h1>
        </header>

        <section>
          <label htmlFor="task-name">Task Name</label>
          <TaskNameInput
            id="task-name"
            placeholder="Task"
            value={taskName}
            setValue={setTaskName}
          />
        </section>

        <section>
          <label htmlFor="priority">Priority Level</label>
          <RadioButtons
            id="priority"
            options={["1", "2", "3"]}
            selectedOption={priority}
            setSelectedOption={setPriority}
          />
        </section>

        <section>
          <label htmlFor="complexity">Complexity Level</label>
          <RadioButtons
            id="complexity"
            options={["1", "2", "3"]}
            selectedOption={complexity}
            setSelectedOption={setComplexity}
            title="Select Complexity Level"
          />
        </section>

        <section className="date-time-section">
          <label htmlFor="datetime">Due Date and Time</label>
          <DatePicker
            id="datetime"
            value={dueDateTime}
            onChange={(date) => handleDateTimeSelected(date)}
            // onChange={setDueDateTime}
            style={!isDateSelected ? { color: "#BABABA" } : { color: "black" }}
            format="M/DD/YY   h:mm a"
            plugins={[<TimePicker position="right" />]}
          />
        </section>
        <section className="subtasks-section">
          <label htmlFor="subtasks">Subtasks </label>
          <div className="sub-task">
            {subtasks.map((subtask, index) => {
              return (
                <SubtaskInput
                  key={index}
                  inputValue={subtask.name}
                  setInputValue={handleChange}
                  handleRemove={handleRemove}
                  handleAdd={handleAdd}
                  index={index}
                  length={subtasks.length}
                />
              );
            })}
          </div>
        </section>

        <section>
          <label htmlFor="category-input">Tags</label>
          <CategoryInput
            id="category-input"
            placeholder="Gym, School, Work"
            value={category}
            setValue={setCategory}
          />
        </section>

        <footer>
          <button className="add-task-btn" onClick={handleSubmit}>
            <span>{isUpdating ? "Saving" : "Save Changes"}</span>
            <RotatingLines
              visible={isUpdating}
              height="30"
              width="30"
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </button>

          {isUpdating && <Msg>Updating...</Msg>}
        </footer>
      </div>
    );
  } else {
    console.log("error");
  }
};

export default EditTask;
