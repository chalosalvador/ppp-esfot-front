import { Form, Button, Input, message, Select, InputNumber } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'
import { useDataList } from '../data/useDataList'
import { useCareersList } from '../data/useCareersList'

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

const TeacherForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataSearch, isLoading, isError } = useDataList('faculties')
  const [currentCareers, setCurrentCareers] = useState([])
  const { careers } = useCareersList()

  const addTeacher = async (values) => {
    setIsSubmitting(true)
    await addObject('teachers', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editTeacher = async (values) => {
    setIsSubmitting(true)
    await editObject('teachers', values, props.register.teacher_id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeFaculty = (value) => {
    dataSearch.map((faculty) =>
      faculty.id == value ? setCurrentCareers(faculty.careers) : []
    )
  }

  return !props.edit ? (
    <Form onFinish={addTeacher} {...formItemLayout}>
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
        <Select
          placeholder="Selecciona una facultad"
          onChange={handleChangeFaculty}
          onClear={handleChangeFaculty}
          loading={isLoading}
        >
          {dataSearch.map((faculty) => (
            <Option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="career_id"
        label="Carrera"
        rules={[
          {
            required: true,
            message: 'Selecciona un carrera...',
          },
        ]}
      >
        <Select placeholder="Selecciona una carrera" loading={isLoading}>
          {currentCareers.map((career) => (
            <Option key={career.id} value={career.id}>
              {career.name}
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
        name="degree"
        label="Título"
        rules={[{ required: true, message: 'Ingresa su título.' }]}
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
          {
            required: true,
            type: 'number',
            min: 999999,
            max: 9999999,
            message: 'Maximo 7 Caracteres.',
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
          {
            required: true,
            type: 'number',
            min: 99999999,
            max: 999999999,
            message: 'Maximo 10 Caracteres.',
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
      {...formItemLayout}
      onFinish={editTeacher}
      initialValues={{
        career_id: props.register.career_id,
        name: props.register.teacher.name,
        lastname: props.register.teacher.lastname,
        degree: props.register.degree,
        email: props.register.teacher.email,
        phone: props.register.teacher.phone,
        mobile: props.register.teacher.mobile,
        sex: props.register.teacher.sex,
      }}
    >
      {/*
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
        <Select
          placeholder="Selecciona una facultad"
          onChange={handleChangeFaculty}
          loading={isLoading}
        >
          {dataSearch.map((faculty) => (
            <Option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      */}
      <Form.Item
        name="career_id"
        label="Carrera"
        rules={[
          {
            required: true,
            message: 'Selecciona un carrera...',
          },
        ]}
      >
        <Select placeholder="Selecciona una carrera" loading={isLoading}>
          {currentCareers.map((career) => (
            <Option key={career.id} value={career.id}>
              {career.name}
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
        name="degree"
        label="Título"
        rules={[{ required: true, message: 'Ingresa su título.' }]}
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
          {
            required: true,
            type: 'number',
            min: 999999,
            max: 9999999,
            message: 'Maximo 7 Caracteres.',
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
          {
            required: true,
            type: 'number',
            min: 99999999,
            max: 999999999,
            message: 'Maximo 10 Caracteres.',
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
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TeacherForm
