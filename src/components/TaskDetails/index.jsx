import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../../context/TaskProvider";
import "./task-details-styles.css";
import EditIcon from "../Task/EditIcon";
import CheckIcon from "../Task/CheckIcon";
import DeleteIcon from "../DeleteIcon";
import { calcPercentComplete } from "../../utility/calcPercentComplete";
import BackBtn from "../BackBtn";
import ProgressBar from "../ProgressBar";
import CheckMarkIcon from "./CheckMarkIcon";
import RepeatIcon from "./RepeatIcon";
import { getColorDueDate } from "../../utility/getColorDueDate";
import CalendarIcon from "../Task/CalendarIcon";
import PriorityIcon from "../Task/PriorityIcon";
import Complexity from "../Task/Complexity";
import { getRandomColor } from "../../utility/getRandomColor";
import TagIcon from "../Task/TagIcon";


const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, setTasks } = useContext(TaskContext);
  const [task, setTask] = useState();


  useEffect(() => {
    const currTask = tasks.find((task) => task.id === id);
    setTask(currTask);
  }, [id, tasks]);

  const handleDeleteTask = () => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    console.log("hello")
    navigate(`/`);
  };

  const toggleCompletedStatus = () => {

    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        tk.completed = !tk.completed;
        // tk.percentCompleted = 100;
        // if (tk.percentCompleted !== 100) {
        //   tk.percentCompleted = 100;
        // }
      }
      return tk;
    });
    setTasks(newTasks);
    completeAllSubtasks(true)

  };



 

  const completeAllSubtasks = (bool) => {
    let newSubtasks = [];
    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        newSubtasks = tk.subtasks.map((subtask, idx) => {
          subtask.completed = bool;
          return subtask;
        });
        // console.log(newSubtasks);
      }
      tk.percentCompleted = calcPercentComplete(tk.subtasks);
      tk.subtasks = newSubtasks;
      return tk;
    });
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
  };




  const toggleCompleted = (index) => {
    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        tk.subtasks[index].completed = !tk.subtasks[index].completed;
        tk.percentCompleted = calcPercentComplete(tk.subtasks);
      }
      return tk;
    });
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
  };

  const handleRepeatTask = () => {
    let newSubtasks = [];
    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        newSubtasks = tk.subtasks.map((subtask, idx) => {
          subtask.completed = false;
          return subtask;
        });
        // console.log(newSubtasks);
      }
      tk.percentCompleted = calcPercentComplete(tk.subtasks);
      tk.subtasks = newSubtasks;
      return tk;
    });
    setTasks(newTasks);
    localStorage.setItem("todo-app", JSON.stringify(newTasks));
  };

  


  
  if (task) {
    return (
      <div className="task-details-page">
        <header>
          <Link to={`/`}>
            <BackBtn />
          </Link>
          <h1>Task Details</h1>
        </header>

        <div className="task-details">
          <div className="task-header">
            <div className="task-name">
              <div
                className="label"
                style={{
                  backgroundColor: getColorDueDate(task.dueDateTime),
                }}
              ></div>
              <h3
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </h3>
            </div>

            <div className="task-header-icons">
              <CheckIcon
                onClick={toggleCompletedStatus}
               
                disabled={task.completed}
                style={{
                  backgroundColor: task.completed && "green",
                  color: task.completed && "white",
                }}
              />
              <Link to={`/edittask/${task.id}`}>
                {" "}
                <EditIcon />
              </Link>

              
                <DeleteIcon onClick={handleDeleteTask} />
             
            </div>
          </div>
<div className="container">
<div className="mid-bottom-section">
<section
            className="task-mid-section"
            style={{
              opacity: task.completed && 0.1,
            }}
          >

            <div className="row">
              <CalendarIcon />
              <label htmlFor="due-date">Due Date:</label>
              <span
                id="due-date"
                style={{
                  color: getColorDueDate(task.dueDateTime),
                  fontWeight: "bold",
                }}
              >
                {task.dueDateTime.format("M/DD/YY  h:mm a")}{" "}
              </span>
            </div>

            <div className="row">
              <PriorityIcon />
              <label htmlFor="priority">Priority:</label>
              <span>
                {task.priority}
                <span style={{ fontSize: "12px" }}>/10</span>{" "}
              </span>
            </div>

            <div className="row">
              <Complexity />
              <label htmlFor="complexity">Complexity:</label>
              <span>
                {task.complexity}
                <span style={{ fontSize: "12px" }}>/10</span>{" "}
              </span>
            </div>

            <div className="row">
              <TagIcon />

              <label htmlFor="tag">Tag:</label>
              <span>
                {task.category &&
                  task.category.split(",").map((tag, idx) => {
                    return (
                      <span
                        key={idx}
                        className="tag"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {tag}
                      </span>
                    );
                  })}
              </span>
            </div>

            <ProgressBar percentCompleted={task.percentCompleted || 0} />
          </section>

          <section
            style={{
              opacity: task.completed && 0.1,
            }}
          >
            {task.subtasks.length >= 1 &&
              task.subtasks.map((subtask, index) => {
                return (
                  <p
                    className="subtask-box"
                    key={index}
                    style={{
                      textDecoration: subtask.completed
                        ? "line-through"
                        : "none",
                    }}
                    onClick={() => toggleCompleted(index)}
                  >
                    {subtask.name}
                    <CheckMarkIcon
                      className="subtask-checkmark"
                      completed={subtask.completed}
                    />
                  </p>
                );
              })}
          </section>


</div>

{task.completed && (
            <div className="cover">
    
            
              <span className="stamp is-complete">Completed</span>
              
            </div>
          )}

</div>



        </div>
        <div className="task-details-footer">
          <button className="repeat-task-btn" onClick={handleRepeatTask}>
            <RepeatIcon />
            <span>Repeat Task</span>
          </button>
        </div>
      </div>
    );
  } else console.log("first");
};

export default TaskDetails;
