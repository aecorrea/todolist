import React from 'react'

const NewTask = ({newTask, setNewTask, addTask }) => {
  return (

    <>
        {/* New Task  */}
    <div className="row">
        <div className="col">
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className="form-control form-control-lg" 
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} type="button" className="btn btn-lg btn-success">Agregar Tarea </button>
    </div>
    </div>
    <br/>
      </>
  )
}

export default NewTask