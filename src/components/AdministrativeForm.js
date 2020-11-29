import {Form, Button, Input, message, Select} from 'antd';
import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import {AddObject, EditObject} from "./Add";
import {useDataList} from "../data/useDataList";

const AdministrativeForm = (props) => {
    const {setShowModal} = useContext(ModalContext);
    const {dataSearch} = useDataList('careers');
    const { Option } = Select;
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const prefixSelector2 = (
        <Form.Item name="prefix2" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addAdministrative = async (values) => {
        setIsSubmitting(true);
        AddObject("administratives",values);
        setIsSubmitting(false);
        setShowModal(false);

    }

    const editAdministrative = async (values) => {
        values['status'] = 'C';
        setIsSubmitting(true);
        EditObject("administratives",values,props.register.administrative_id)
        setIsSubmitting(false);
        setShowModal(false);
    }
    return(


        !props.edit?
            (
                <Form onFinish={addAdministrative}>
                    <Form.Item name="faculty_id" label="FACULTAD" rules={[{ required: true, message: 'Porfavor ingrese la facultad' }]}>
                        <Select placeholder="Seleccione la Facultad">

                            {
                                dataSearch.map((item) => (
                                    <Option key={ item.id }>{item.name}</Option>
                                ))}

                        </Select>
                    </Form.Item>
                    <Form.Item name="name" label="Nombres" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Apellidos" rules={[{ required: true, message: 'Porfavor ingrese el apellido' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[
                        { required: true, message: 'Porfavor ingrese el email' },
                        { type: 'email', message: 'Ingresa un correo electrónico válido.'}
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Telefono" rules={[
                        { required: true, message: 'Porfavor ingrese el telefono' },
                        {
                            pattern: new RegExp( '^\\d{7,}$' ),
                            message: 'Ingresa un número de teléfono válido.'
                        }
                        ]}>
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="mobile" label="Celular" rules={[
                        { required: true, message: 'Porfavor ingrese el telefono' },
                        {
                            pattern: new RegExp( '^\\d{7,}$' ),
                            message: 'Ingresa un número de teléfono válido.'
                        }
                    ]}>
                        <Input addonBefore={prefixSelector2} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="sex" label="Genero" rules={[{ required: true, message: 'Porfavor ingrese el genero' }]}>
                        <Select placeholder="Seleccione la Facultad">
                            <Option key="female">Femenino</Option>
                            <Option key="male">Masculino</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Registrar</Button>
                    </Form.Item>
                </Form>
            ):
            (
                <Form onFinish={editAdministrative} initialValues={{ faculty_id: props.register.faculty ,name: props.register.name, lastname: props.register.lastname, phone: props.register.phone, mobile: props.register.mobile, sex: props.register.sex}}>
                    <Form.Item name="faculty_id" label="FACULTAD" rules={[{ required: true, message: 'Porfavor ingrese la facultad' }]}>
                        <Select placeholder="Seleccione la Facultad">

                            {
                                dataSearch.map((item) => (
                                    <Option key={ item.id }>{item.name}</Option>
                                ))}

                        </Select>
                    </Form.Item>
                    <Form.Item name="name" label="Nombres" rules={[{ required: true, message: 'Porfavor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Apellidos" rules={[{ required: true, message: 'Porfavor ingrese el apellido' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Telefono" rules={[
                        { required: true, message: 'Porfavor ingrese el telefono' },
                        {
                            pattern: new RegExp( '^\\d{7,}$' ),
                            message: 'Ingresa un número de teléfono válido.'
                        }
                    ]}>
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="mobile" label="Celular" rules={[
                        { required: true, message: 'Porfavor ingrese el telefono' },
                        {
                            pattern: new RegExp( '^\\d{7,}$' ),
                            message: 'Ingresa un número de teléfono válido.'
                        }
                    ]}>
                        <Input addonBefore={prefixSelector2} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="sex" label="Genero" rules={[{ required: true, message: 'Porfavor ingrese el genero' }]}>
                        <Select placeholder="Seleccione la Facultad">
                            <Option key="female">Femenino</Option>
                            <Option key="male">Masculino</Option>
                        </Select>

                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={ isSubmitting }>Editar</Button>
                    </Form.Item>
                </Form>
            )

    )
}

export default AdministrativeForm;