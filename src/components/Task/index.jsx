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

const Task = ({ task }) => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  useEffect(() => {}, []);

  const handleDeleteTask = () => {
    const newTasks = tasks.filter((tk) => tk.id !== task.id);
    setTasks(newTasks);
    navigate(`/`);
  };

  return (
    <div className="task">
      <div className="task-header">
        <div className="task-name">
          <div className="label"></div>
          <h3>{task.name}</h3>
        </div>

        <div className="task-header-icons">
          <EditIcon />
          <CheckIcon />
          <DeleteIcon onClick={handleDeleteTask} />
        </div>
      </div>

      <section className="task-mid-section">
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
};

export default Task;
