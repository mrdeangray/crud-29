import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../context/TaskProvider";
import Task from "../Task";
import SearchInput from "../SearchInput";
import DropDownMenu from "../DropDownMenu";
import "./read-tasks-styles.css";
import PowerOffIcon from "./PowerOffIcon";
import PowerOnIcon from "./PowerOnIcon";
import PlusIcon from "./PlusIcon";

const ReadTasks = () => {
  const { tasks } = useContext(TaskContext);
  const [powerModeOn, setPowerModeOn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [search, setSearch] = useState("");

  const sortOptions = {
    ascending: (a, b) => a.name.localeCompare(b.name),
    descending: (a, b) => b.name.localeCompare(a.name),
  };

  useEffect(() => {
    const allCategories = [...new Set(tasks.map((task) => task.category))];
    setCategories(allCategories);
  }, []);

  return (
    <div className="read-tasks">
      <header>
        <SearchInput search={search} setSearch={setSearch} />
        <button
          className="power-mode-btn"
          onClick={() => setPowerModeOn(!powerModeOn)}
        >
          {powerModeOn ? (
            <div className="power-icon-text">
              <PowerOffIcon />
              <span>Power Mode Off</span>
            </div>
          ) : (
            <div className="power-icon-text">
              <PowerOnIcon />
              <span>Power Mode On</span>
            </div>
          )}
        </button>
      </header>

      <div className="drop-down-btns">
        <DropDownMenu
          options={Object.keys(sortOptions)}
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
          title="Sort"
        />

        <DropDownMenu
          options={categories}
          selectedOption={selectedCategory}
          setSelectedOption={setSelectedCategory}
          title="Category"
        />
      </div>
      <div className="all-tasks">
        {(!selectedCategory
          ? tasks
          : tasks.filter((task) => task.category === selectedCategory)
        )
          .sort(sortOptions[selectedSortOption])
          .filter((task) => task.name.toLowerCase().includes(search))
          .map((task) => {
            if (powerModeOn) {
              return <Task key={task.id} task={task} />;
            } else {
              return <Task key={task.id} task={task} />;
            }
          })}
      </div>

<div className="read-tasks-footer">
<Link to={`/createtask`}>
        <button className="add-task-btn" style={{ marginTop: "40px" }}>
          <div className="add-icon-text">
            <PlusIcon />
            <span>Add New Task</span>
          </div>
        </button>
      </Link>
</div>
    </div>
  );
};

export default ReadTasks;
