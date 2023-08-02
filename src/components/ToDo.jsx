import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const ToDo = ({toDo, markDone, setUpdateData, deleteTask}) => {
  return (
    <>
    {toDo && toDo
          //Order tasks by ID Number
          .sort((a, b) => (a.id > b.id ? 1 : -1))
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
                    <span
                      title="Completado / Sin Completar"
                      onClick={(e) => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Editar Tarea"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span title="Eliminar Tarea" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
</>
  )
}

export default ToDo