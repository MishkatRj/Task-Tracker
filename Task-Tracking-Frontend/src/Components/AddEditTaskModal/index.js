import React, { useState } from 'react'
import classes from "./AddEditTaskModal.module.css"
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton"
import { Col, Row } from 'react-bootstrap'
import Input from "../Input/Input"
import TextArea from "../TextArea/TextArea"
import Button from '../Button/Button'
import { toast } from 'react-toastify'
const AddEditTaskModal = ({setShow , show , onClick , selectedTask}) => {

    const [title, setTitle] = useState(selectedTask?.title || "")
    const [assignTo, setAssignTo] = useState(selectedTask?.assignTo || "")
    const [description, setDescription] = useState(selectedTask?.description || "")

    const handleClick = () => {
            const params = {
                title,
                assignTo,
                description
            }
            for(let key in params){
                if(!params[key]){
                    return toast.error("Please fill all the fields")
                }
            }

            onClick(params)
    }
  return (
    <ModalSkeleton setShow={setShow} show={show} header={selectedTask ? "Edit Task" : "Add Task"}>
        <div className={classes.main}>
                <Row className={classes.rowMain}>
                    <Col md={12}>
                            <Input setter={setTitle} value={title} label={"Title"} placeholder={"Title"}/>
                    </Col>
                    <Col md={12}>
                            <Input setter={setAssignTo} value={assignTo} label={"Assign To"} placeholder={"Assign To"}/>
                    </Col>
                    <Col md={12}>
                    <TextArea setter={setDescription} value={description} label={"Description"} placeholder={"Description"}/>
                    </Col>
                    <Col md={12}>
                    <div className={classes.btnWrapper}>
                    <Button onClick={handleClick} label={"Submit"}/>
                    </div>
                    </Col>
                </Row>
        </div>
    </ModalSkeleton>
  )
}

export default AddEditTaskModal