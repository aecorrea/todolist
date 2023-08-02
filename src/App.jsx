import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewTask from "./components/NewTask";
import UpdateTask from "./components/UpdateTask";
import ToDo from "./components/ToDo";

function App() {
  //Tasks State
  const [toDo, setToDo] = useState([
    { id: 1, title: "Tarea 1", status: false },
    { id: 2, title: "Tarea 2", status: false },
  ]);

  // Temporary State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //New Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  //Mark task as completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      return task.id === id ? { ...task, status: !task.status } : task;
    });
    setToDo(newTask);
  };

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  //Change Task for Update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo.filter((task) => task.id !== updateData.id)];
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br /><br />
      <h1>Lista de Tareas</h1>
      <br /><br />
      
      {updateData && updateData ? (
        <UpdateTask
          updateData={updateData}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <NewTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Display Tasks */}
      {toDo && toDo.length ? "" : "No tasks to display."}
      <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
      />

      
    </div>
  );
}
export default App;
