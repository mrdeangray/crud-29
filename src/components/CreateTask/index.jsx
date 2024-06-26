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
import "./create-task-styles.css";
import SubtaskInput from "../SubtaskInput";
import CategoryInput from "../CategoryInput";
import { RotatingLines } from "react-loader-spinner";

const Msg = styled.p`
  font-size: 20px;
  color: red;
`;
const CreateTask = () => {

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



  const loadSampleData = () => {
    const newTask = {};
    newTask.id = uuid();
    newTask.name = "Dean";
    newTask.dueDateTime = dueDateTime;

    newTask.priority = priority;
    newTask.complexity = complexity;
    newTask.subtasks = subtasks;
    newTask.percentCompleted = 0;
    newTask.completed = false;
    newTask.category = category;
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
    
  };

  const handleSubmit = () => {
    const newTask = {};
    newTask.id = uuid();
    newTask.name = taskName;
    newTask.dueDateTime = dueDateTime;

    newTask.priority = priority;
    newTask.complexity = complexity;
    newTask.subtasks = subtasks;
    newTask.percentCompleted = 0;
    newTask.completed = false;
    newTask.category = category;
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
    setIsUpating(true);
    setTimeout(() => {
      setIsUpating(false);
      navigate(`/`);
    }, 2000);
  };
  
  // const loadSampleData=()=>{
  //   for(let i=0; i<=6; i++){
  //     handleSubmit2()
  //   }
  //   navigate("/")
  // }

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
    // console.log(e)
    setDueDateTime(date);
    setIsDateSelected(true);
  };
  return (
    <div className="create-task">
      <button onClick={loadSampleData}>Add fake data</button>
      <header>
        <Link to={`/`}>
          <BackBtn />
        </Link>
        <h1>Add New Task</h1>
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
          <span>{isUpdating ? "Saving" : "Save Task"}</span>
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
};

export default CreateTask;
