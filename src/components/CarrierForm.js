import { Form,Button, Input, message, Select } from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import {AddObject, EditObject} from "./Add";
import API from '../data';
import {useDataList} from "../data/useDataList";

const CarrierForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const {dataSearch} = useDataList('faculties');
    const { Option } = Select;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addCarrier = async (values) => {
        setIsSubmitting(true);
        AddObject("careers",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editCarrier = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("careers",values,props.register.id)
        setIsSubmitting(false);
        setShowModal(false);
    }

    const DeleteCarrier = async (values) => {
        const representative = await API.delete( `/faculties/1` )
        console.log(representative);
    }

    return(


        !props.edit?
            (

                <Form onFinish={addCarrier}>
                    <Form.Item name="name" label="Nombres" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="pensum" label="Pensum" rules={[{ required: true, message: 'Porfavor ingrese el pensum' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="levels" label="Nivel" rules={[{ required: true, message: 'Porfavor ingrese el nivel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="faculty_id" label="Facultad" rules={[{ required: true, message: 'Porfavor ingrese la facultad' }]}>
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
                <Form onFinish={editCarrier} initialValues={{ name: props.register.name ,pensum: props.register.pensum,levels: props.register.levels,faculty_id: props.register.faculty_id }}>
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="pensum" label="Pensum" rules={[{ required: true, message: 'Porfavor ingrese el pensum' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="levels" label="Nivel" rules={[{ required: true, message: 'Porfavor ingrese el nivel' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="faculty_id" label="Facultad" rules={[{ required: true, message: 'Porfavor ingrese la facultad' }]}>
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

export default CarrierForm;