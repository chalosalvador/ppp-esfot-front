import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import {AddObject, EditObject} from "./Add";

const AdministrativeForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addAdministrative = async (values) => {
        setIsSubmitting(true);
        AddObject("administrative",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editAdministrative = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("administrative",values,props.register.administrative_id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addAdministrative}>
                    <Form.Item name="name" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editAdministrative} initialValues={{ faculty_id: props.register.faculty_id }}>
                    <Form.Item name="faculty_id" label="FACULTAD">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default AdministrativeForm;