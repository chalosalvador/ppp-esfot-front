import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';

const CarrierForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addCarrier = async (values) => {
        setIsSubmitting(true);
        message.loading( {
            content: 'Guardando los datos de la facultad',
        });
        console.log('Agregando', values);
        const representative = await API.post( '/careers', values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editCarrier = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        message.loading( {
            content: 'Editando los datos de la facultad',
        });
        console.log('Editando', values);
        const representative = await API.put( `/careers/${props.register.id}`, values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addCarrier}>
                    <Form.Item name="name" label="Nombres">
                        <Input />
                    </Form.Item>
                    <Form.Item name="pensum" label="Pensum">
                        <Input />
                    </Form.Item>
                    <Form.Item name="levels" label="Nivel">
                        <Input />
                    </Form.Item>
                    <Form.Item name="faculty_id" label="Facultad">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editCarrier} initialValues={{ name: props.register.name ,pensum: props.register.pensum,levels: props.register.levels,faculty_id: props.register.faculty_id }}>
                    <Form.Item name="name" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item name="pensum" label="Pensum">
                        <Input />
                    </Form.Item>
                    <Form.Item name="levels" label="Nivel">
                        <Input />
                    </Form.Item>
                    <Form.Item name="faculty_id" label="Facultad">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default CarrierForm;