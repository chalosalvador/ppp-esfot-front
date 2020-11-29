import { Form,Button, Input, message } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import {AddObject, EditObject} from "./Add";

const SubjectForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addSubject = async (values) => {
        setIsSubmitting(true);
        AddObject("subjects",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editSubject = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("subjects",values,props.register.id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addSubject}>
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="code" label="Codigo" rules={[{ required: true, message: 'Porfavor ingrese el codigo' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="level" label="Nivel" rules={[{ required: true, message: 'Porfavor ingrese el nivel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="unit" label="Unidad" rules={[{ required: true, message: 'Porfavor ingrese la unidad' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="field" label="Descripcion" rules={[{ required: true, message: 'Porfavor ingrese la descripcion' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editSubject} initialValues={{ name: props.register.name ,code: props.register.code,level: props.register.level,unit: props.register.unit,field: props.register.field }}>
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="code" label="Codigo" rules={[{ required: true, message: 'Porfavor ingrese el codigo' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="level" label="Nivel" rules={[{ required: true, message: 'Porfavor ingrese el nivel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="unit" label="Unidad" rules={[{ required: true, message: 'Porfavor ingrese la unidad' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="field" label="Descripcion" rules={[{ required: true, message: 'Porfavor ingrese la descripcion' }]}>
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