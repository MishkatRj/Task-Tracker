import React, { useState } from 'react'
import classes from "./Dashboard.module.css"
import { Col, Container, Row } from 'react-bootstrap'
import Button from '../../Components/Button/Button'
import TaskCard from '../../Components/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModal from '../../Components/AddEditTaskModal'
import { generateRandomId } from '../../Config/apiUrl'
import { removeTask, setAllTasks } from '../../redux/commonSlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isSignout } from '../../redux/authSlice'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const { status } = useSelector((state) => state?.commonReducer)
  const { user } = useSelector((state) => state?.authReducer)

  console.log(user , "useruseruser")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddTesk = (params) => {
    const idGenerate = generateRandomId(10)
    const tempArr = [...status]
    let addTesk;
    if (selectedTask) {
      addTesk = tempArr?.map((ele) =>
        ele?.id === selectedStatus?.id
          ? { ...ele, tasks: ele?.tasks?.map((ts) => ts?.id === selectedTask?.id ? { ...params, id: ts?.id } : ts) }
          : ele
      )
    } else {
      addTesk = tempArr?.map((ele) =>
        ele?.id === selectedStatus?.id
          ? { ...ele, tasks: [...ele?.tasks, { ...params, id: idGenerate }] }
          : ele
      )
    }
    dispatch(setAllTasks(addTesk))
    setModalShow(false)
  }

  const handleDelete = () => {
    const tempArr = [...status]
    const addTesk = tempArr?.map((ele) =>
      ele?.id === selectedStatus?.id
        ? { ...ele, tasks: ele?.tasks?.filter((fl) => fl?.id !== selectedTask?.id) }
        : ele
    )
    dispatch(setAllTasks(addTesk))
    setSelectedTask(null)
  }

  const moveTask = (taskId, sourceColumnId, destinationColumnId) => {
    const tempArr = JSON.parse(JSON.stringify(status))
    let movingTask;
    const updatedColumns = tempArr?.map((column) => {
      if (column?.id === sourceColumnId) {
        const taskIndex = column?.tasks?.findIndex((task) => task?.id === taskId)
        if (taskIndex !== -1) {
          movingTask = column?.tasks[taskIndex]
          column?.tasks?.splice(taskIndex, 1)
        }
      }
      return column
    })?.map((column) => {
      if (column?.id === destinationColumnId && movingTask) {
        column?.tasks?.push(movingTask)
      }
      return column
    })

    dispatch(setAllTasks(updatedColumns))
  }

  const handleLogout = () => {
      dispatch(isSignout())
      navigate("/login")
      dispatch(removeTask())
  }

  return (
    <div className={classes.main}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.header}>
            <h4>My Board</h4>
            <div>
              <h4>Welcome {user?.firstName} {user?.lastName}</h4>
              <Button onClick={handleLogout} label={"Logout"} />
            </div>
          </div>
          <DndProvider backend={HTML5Backend}>
            <div className={classes.task__wrapper}>
              <Row className={classes.task__row}>
                {status?.map((ele, index) => {
                  return (
                    <Col key={index} md={4}>
                      <TaskCard
                        setSelectedTask={setSelectedTask}
                        setSelectedStatus={setSelectedStatus}
                        setModalShow={setModalShow}
                        onDelete={handleDelete}
                        onAdd={() => {
                          setSelectedTask(null)
                          setSelectedStatus(ele)
                          setModalShow(true)
                        }}
                        data={ele}
                        moveTask={moveTask}
                      />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </DndProvider>
        </div>
      </Container>
      {modalShow && (
        <AddEditTaskModal selectedTask={selectedTask} onClick={handleAddTesk} setShow={setModalShow} show={modalShow} />
      )}
    </div>
  )
}

export default Dashboard
