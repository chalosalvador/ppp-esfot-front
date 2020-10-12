import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';

const FacultiesForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addFacultie = async (values) => {
        setIsSubmitting(true);
        message.loading( {
            content: 'Guardando los datos de la facultad',
          });
        console.log('Agregando', values);
        const representative = await API.post( '/faculties', values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);
        
    }

    const editFacultie = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        message.loading( {
            content: 'Editando los datos de la facultad',
          });
        console.log('Editando', values);
        const representative = await API.put( `/faculties/${props.register.id}`, values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(
        
        
        !props.edit?
        (
        <Form onFinish={addFacultie}>
            <Form.Item name="name" label="Nombre">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
            </Form.Item>
        </Form>
        ):
        (
        <Form onFinish={editFacultie} initialValues={{ name: props.register.name }}>
            <Form.Item name="name" label="Nombre">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
            </Form.Item>
        </Form>
        )
    
    )
}

export default FacultiesForm;