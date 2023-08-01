import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

function App() {
  //Tasks State
  const [toDo, setToDo] = useState([
    { id: 1, title: "Task 1", status: false },
    { id: 2, title: "Task 2", status: false },
  ]);

  // Temporary State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //New Task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = {id: num, title: newTask, status: false};
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id);
    setToDo(newTasks);
  };

  //Mark task as completed
  const markDone = (id) => {
    let newTask = toDo.map(task => {
   return task.id === id ? {...task, status: !task.status} : task;
    }) 
    setToDo(newTask);
  };

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');
  };

  //Change Task for Update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setUpdateData(newEntry);
  };

  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo.filter(task => task.id !== updateData.id)]
    let updateObject = [...filterRecords, updateData]
    setToDo(updateObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br /><br />
      <h1>To-Do List App</h1>
      <br /><br />

    {/* Update Task  */}
    {updateData && updateData ? (
      <>
          <div className="row">
          <div className="col">
          <input 
          type="text" 
          value={updateData && updateData.title} 
          onChange={(e) => changeTask(e)}
          className="form-control form-control-lg" />
        </div>
        <div className="col-auto">
          <button onClick={updateTask} className="btn btn-lg btn-success mr-20">Update</button>
          <button onClick={cancelUpdate} className="btn btn-lg btn-warning">Cancel</button>
        </div>
        </div>
        <br></br>
    </>

    ) : (
      <>
        {/* New Task  */}
    <div className="row">
        <div className="col">
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className="form-control form-control-lg" 
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} type="button" className="btn btn-lg btn-success">Add Task </button>
    </div>
    </div>
    <br/>
      </>


    ) }
    
      {/* Display Tasks */}
      {toDo && toDo.length ? "" : "No tasks to display."}
      
      {toDo && toDo
      //Order tasks by ID Number
        .sort((a, b) => a.id > b.id ? 1 : -1)
      //Render Task List
        .map((task, i) => {
          
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{i + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrapper">
                  <span title="Completed / Not Completed" onClick={(e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span title="Edit"
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}>
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                  <span title="Delete" onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}
export default App;
