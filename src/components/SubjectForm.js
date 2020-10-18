import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';

const SubjectForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addSubject = async (values) => {
        setIsSubmitting(true);
        message.loading( {
            content: 'Guardando los datos de la facultad',
        });
        console.log('Agregando', values);
        const representative = await API.post( '/subjects', values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editSubject = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        message.loading( {
            content: 'Editando los datos de la facultad',
        });
        console.log('Editando', values);
        const representative = await API.put( `/subjects/${props.register.id}`, values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addSubject}>
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
                <Form onFinish={editSubject} initialValues={{ name: props.register.name ,code: props.register.code,level: props.register.level,unit: props.register.unit,field: props.register.field }}>
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

export default SubjectForm;