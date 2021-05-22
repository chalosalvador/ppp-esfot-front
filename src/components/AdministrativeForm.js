import { Form, Button, Input, message, Select,  InputNumber } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import API from '../data'
import { addObject, editObject } from '../utils/formActions'
import { useDataList } from '../data/useDataList'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const AdministrativeForm = (props) => {
  console.log('datos de administrativo', props)

  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataSearch, isLoading, isError } = useDataList('faculties')

  const addAdministrative = async (values) => {
    setIsSubmitting(true)
    await addObject('administratives', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editAdministrative = async (values) => {
    setIsSubmitting(true)
    await editObject(
      'administratives',
      values,
      props.register.administrative_id
    )
    setIsSubmitting(false)
    setShowModal(false)
  }

  return !props.edit ? (
    <Form onFinish={addAdministrative} {...formItemLayout}>
      <Form.Item
        name="faculty_id"
        label="Facultad"
        rules={[
          {
            required: true,
            message: 'Selecciona una facultad...',
          },
        ]}
      >
        <Select placeholder="Selecciona una facultad" loading={isLoading}>
          {dataSearch.map((faculty) => (
            <Option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[{ required: true, message: 'Ingresa su nombre.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Apellido"
        rules={[{ required: true, message: 'Ingresa su apellido.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Ingresa su email.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Teléfono"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Ingresa su numero de teléfono convencional.',
          },
        ]}
      >
         <InputNumber />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Celular"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Ingresa su número de teléfono celular.',
          },
        ]}
      >
         <InputNumber />
      </Form.Item>
      <Form.Item
        name="sex"
        label="Sexo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor seleccione su sexo',
          },
        ]}
      >
        <Select placeholder="Seleccione su sexo">
          <Option value="female">Mujer</Option>
          <Option value="male">Hombre</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form
      onFinish={editAdministrative}
      {...formItemLayout}
      initialValues={{
        faculty_id: props.register.faculty_id,
        name: props.register.administrative.name,
        lastname: props.register.administrative.lastname,
        email: props.register.administrative.email,
        phone: props.register.administrative.phone,
        mobile: props.register.administrative.mobile,
        sex: props.register.administrative.sex,
      }}
    >
      <Form.Item
        name="faculty_id"
        label="Facultad"
        rules={[
          {
            required: true,
            message: 'Selecciona una facultad...',
          },
        ]}
      >
        <Select placeholder="Selecciona una facultad" loading={isLoading}>
          {dataSearch.map((faculty) => (
            <Option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[{ required: true, message: 'Ingresa su nombre.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Apellido"
        rules={[{ required: true, message: 'Ingresa su apellido.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Ingresa su email.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Teléfono"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Ingresa su numero de teléfono convencional.',
          },
        ]}
      >
         <InputNumber />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Celular"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Ingresa su número de teléfono celular.',
          },
        ]}
      >
         <InputNumber />
      </Form.Item>
      <Form.Item
        name="sex"
        label="Sexo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor seleccione su sexo',
          },
        ]}
      >
        <Select placeholder="Seleccione su sexo">
          <Option value="female">Mujer</Option>
          <Option value="male">Hombre</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AdministrativeForm
