import "./App.css";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import ReadTasks from "./components/ReadTasks";
import TaskDetails from "./components/TaskDetails";
import TaskProvider from "./context/TaskProvider";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <TaskProvider>
        <Routes>
          <Route exact path="/createtask" element={<CreateTask />} />
          <Route exact path="/taskdetails/:id" element={<TaskDetails />} />
          <Route exact path="/edittask/:id" element={<EditTask />} />
          <Route exact path="/" element={<ReadTasks />} />
          {/* <Route exact path="/updatetask/:id" element={<UpdateTask />} /> */}
        </Routes>
      </TaskProvider>
    </div>
  );
}

export default App;
