import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskProvider";
import { Link, useNavigate } from "react-router-dom";
import CirclePercent from "../CirclePercent";
import EditIcon from "./EditIcon";
import DeleteIcon from "../DeleteIcon";
import CheckIcon from "./CheckIcon";
import "./task-styles.css";
import CalendarIcon from "./CalendarIcon";
import PriorityIcon from "./PriorityIcon";
import Complexity from "./Complexity";
import TagIcon from "./TagIcon";
import RightChevronIcon from "./RightChevronIcon";
import { getRandomColor } from "../../utility/getRandomColor";
import { color } from "framer-motion";
import { getColorDueDate } from "../../utility/getColorDueDate";
import { calcPercentComplete } from "../../utility/calcPercentComplete";

const Task = ({ task }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);


  useEffect(() => {}, []);

  const handleDeleteTask = () => {
    const newTasks = tasks.filter((tk) => tk.id !== task.id);
    setTasks(newTasks);
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

  if (task) {
    return (
      <div className="task">
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

            <Link>
              <DeleteIcon onClick={handleDeleteTask} />
            </Link>
          </div>
        </div>

        <div className="container">
          <section
            className="task-mid-section"
            style={{
              opacity: task.completed && 0.1,
            }}
          >
            <div className="left">
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
            </div>
            <div className="right">
              <CirclePercent radius="20" percentage={task.percentCompleted} />
              <Link to={`/taskdetails/${task.id}`}>
                <div className="task-details-link">
                  <span>Task Details</span>
                  <RightChevronIcon />
                </div>
              </Link>
            </div>
          </section>
          {task.completed && (
            <div className="cover">
    
            
              <span className="stamp is-complete">Completed</span>
              
            </div>
          )}
        </div>
      </div>
    );
  } else console.log("first");
};

export default Task;
