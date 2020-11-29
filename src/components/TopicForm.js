import {Form, Button, Input, message, Select} from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import {AddObject, EditObject} from "./Add";
import {useDataList} from "../data/useDataList";

const SubjectForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {dataSearch} = useDataList('subjects');
    const { Option } = Select;
    const addTopic = (values) => {
        setIsSubmitting(true);
        AddObject("topics",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editTopic = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("topics",values,props.register.id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addTopic}>
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="subject_id" label="Materia" rules={[{ required: true, message: 'Porfavor ingrese la materia' }]}>
                        <Select placeholder="Seleccione la Facultad">

                            {
                                dataSearch.map((item) => (
                                    <Option key={ item.id }>{item.name}</Option>
                                ))}

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editTopic} initialValues={{ name: props.register.name, subject_id: props.register.subject_id }}>
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="subject_id" label="Materia" rules={[{ required: true, message: 'Porfavor ingrese la materia' }]}>
                        <Select placeholder="Seleccione la Facultad">

                            {
                                dataSearch.map((item) => (
                                    <Option key={ item.id }>{item.name}</Option>
                                ))}

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default SubjectForm;