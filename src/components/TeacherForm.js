import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import {AddObject, EditObject} from "./Add";

const TeacherForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addTeacher = async (values) => {
        setIsSubmitting(true);
        AddObject("teachers",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editTeacher = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("teachers",values,props.register.teacher_id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addTeacher}>
                    <Form.Item name="name" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editTeacher} initialValues={{ degree: props.register.degree ,career_id: props.register.career_id}}>
                    <Form.Item name="degree" label="Grado">
                        <Input />
                    </Form.Item>
                    <Form.Item name="career_id" label="Carrera">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default TeacherForm;