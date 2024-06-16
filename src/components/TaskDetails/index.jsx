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
    navigate(`/`);
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
              <div className="label"></div>
              <h3>{task?.name}</h3>
            </div>

            <div className="task-header-icons">
              <EditIcon />
              <CheckIcon />
              <DeleteIcon onClick={handleDeleteTask} />
            </div>
          </div>

          <section className="task-mid-section">
            <ProgressBar percentCompleted={task.percentCompleted || 0} />
          </section>

          {task.subtasks.map((subtask, index) => {
            return (
              <p
                className="subtask-box"
                key={index}
                style={{
                  textDecoration: subtask.completed ? "line-through" : "none",
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
