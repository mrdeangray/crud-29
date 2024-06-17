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

const Task = ({ task }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {}, []);

  const getColorDueDate = (dueDateTime) => {
    dueDateTime = new Date(dueDateTime)
    let threeDaysBeforeDueDate = new Date(dueDateTime)
    threeDaysBeforeDueDate.setDate(threeDaysBeforeDueDate.getDate() - 3)
    threeDaysBeforeDueDate=threeDaysBeforeDueDate.setHours(0, 0, 0, 0)
    const dueDate = dueDateTime.setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    console.log({ today });
    console.log({ threeDaysBeforeDueDate });
    console.log({ dueDate });

    let color = "";
    if (today >= dueDate) {
      color = "red";
    } else if (threeDaysBeforeDueDate <= today && today < dueDate) {
      color = "orange";
    } else {
      color = "blue";
    }

    return color;
  };

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
  };

  if (task) {
    return (
      <div className="task">
        <div className="task-header">
          <div className="task-name">
            <div
              className="label"
              style={{
                // backgroundColor: task.dueDateTime < new Date() && "orange",
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

        <section
          className="task-mid-section"
          style={{
            opacity: task.completed && 0.1,
          }}
        >
          <div className="left">
            <div className="row">
              <CalendarIcon />
              <span style={{ color: "blue", fontSize: "16px" }}>
                Due Date: {task.dueDateTime.format("MM/DD/YY hh:mm a")}{" "}
              </span>
            </div>
            <div className="row">
              <PriorityIcon />
              <span>Priority: {task.priority} </span>
            </div>
            <div className="row">
              <Complexity />
              <span>Complexity: {task.complexity}</span>
            </div>
            <div className="row">
              <TagIcon />
              <span>
                Tags:
                {task.category.split(",").map((tag, idx) => {
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
      </div>
    );
  } else console.log("first");
};

export default Task;
