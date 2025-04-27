import React from 'react'
import classes from "./TaskCard.module.css"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useDrop } from 'react-dnd'
import SingleTask from './SingleTask'

const TaskCard = ({ data, onAdd, onDelete, setSelectedTask, setSelectedStatus, setModalShow, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      if (item.sourceColumnId !== data.id) {
        moveTask(item.id, item.sourceColumnId, data.id)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [data, moveTask])

  return (
    <div ref={drop} className={classes.taskCard} style={{ backgroundColor: isOver ? '#e2e2e2' : 'white' }}>
      <h5>{data?.title}</h5>
      {data?.tasks?.length > 0 && (
        data?.tasks?.map((t, ind) => (
          <SingleTask
            key={ind}
            task={t}
            data={data}
            setSelectedTask={setSelectedTask}
            setSelectedStatus={setSelectedStatus}
            setModalShow={setModalShow}
            onDelete={onDelete}
          />
        ))
      )}
      <p onClick={onAdd}>+ Add a card</p>
    </div>
  )
}

export default TaskCard
