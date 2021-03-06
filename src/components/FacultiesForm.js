import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import {addObject, editObject} from "../utils/formActions";
import { mutate } from 'swr';

const FacultiesForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addFaculty = async (values) => {
        setIsSubmitting(true);
        await addObject("faculties",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editFaculty = async (values) => {
        // values['status'] = 'C';
        setIsSubmitting(true);
        await editObject("faculties",values,props.register.id)
        setIsSubmitting(false);
        setShowModal(false);
    }

    const deleteFaculties = async () => {
        setIsSubmitting(true);
        message.loading( {
            content: 'Eliminando los datos de la facultad',
        });
        await API.delete( `/faculties/${props.register.id}` )
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
        (
        <Form onFinish={addFaculty}>
            <Form.Item name="name" label="Nombre" rules={[{required: true, message:"Ingresa el nombre de la facultad."}]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
            </Form.Item>
        </Form>
        ):
        (
        <Form onFinish={editFaculty} initialValues={{ name: props.register.name }}>
            <Form.Item name="name" label="Nombre">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                <Button htmlType="submit" onClick={deleteFaculties} loading={isSubmitting}>Eliminar</Button>
            </Form.Item>
        </Form>

        )

    )
}

export default FacultiesForm;
