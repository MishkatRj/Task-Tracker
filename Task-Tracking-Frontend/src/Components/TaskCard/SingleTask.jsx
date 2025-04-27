import React from 'react'
import { useDrag } from 'react-dnd'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import classes from "./TaskCard.module.css"

const SingleTask = ({ task, data, setSelectedTask, setSelectedStatus, setModalShow, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, sourceColumnId: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [task, data])

  return (
    <div ref={drag} className={classes.ListTasks} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span>
        <FaEdit onClick={() => {
          setSelectedTask(task)
          setSelectedStatus(data)
          setModalShow(true)
        }} />
        <MdDelete onClick={() => {
          setSelectedTask(task)
          setSelectedStatus(data)
          onDelete()
        }} />
      </span>
      <h6>{task?.title}</h6>
      <p><span>Assign to:</span> {task?.assignTo}</p>
      <p>{task?.description}</p>
    </div>
  )
}

export default SingleTask
