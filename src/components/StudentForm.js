import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import {addObject, editObject} from "../utils/formActions";


const StudentForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addStudent = async (values) => {
        setIsSubmitting(true);
        await addObject("students",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editStudent = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        await editObject("students",values,props.register.id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addStudent}>
                    <Form.Item name="name" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item name="code" label="Codigo">
                        <Input />
                    </Form.Item>
                    <Form.Item name="level" label="Nivel">
                        <Input />
                    </Form.Item>
                    <Form.Item name="unit" label="Unidad">
                        <Input />
                    </Form.Item>
                    <Form.Item name="field" label="Descripcion">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editStudent} initialValues={{ name: props.register.name ,code: props.register.code,level: props.register.level,unit: props.register.unit,field: props.register.field }}>
                    <Form.Item name="name" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item name="code" label="Codigo">
                        <Input />
                    </Form.Item>
                    <Form.Item name="level" label="Nivel">
                        <Input />
                    </Form.Item>
                    <Form.Item name="unit" label="Unidad">
                        <Input />
                    </Form.Item>
                    <Form.Item name="field" label="Descripcion">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default StudentForm;
