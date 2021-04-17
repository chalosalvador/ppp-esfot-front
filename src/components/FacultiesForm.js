import { Form, Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import API from '../data'
import { AddObject, EditObject } from './Add'

const FacultiesForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addFacultie = async (values) => {
    setIsSubmitting(true)
    AddObject('faculties', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editFacultie = async (values) => {
    values['status'] = 'C'
    setIsSubmitting(true)
    EditObject('faculties', values, props.register.id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const DeleteFaculties = async () => {
    setIsSubmitting(true)
    message.loading({
      content: 'Eliminando los datos de la facultad',
    })
    const representative = await API.delete(`/faculties/${props.register.id}`)
    console.log(representative)
    setIsSubmitting(false)
    setShowModal(false)
  }
  return !props.edit ? (
    <Form onFinish={addFacultie}>
      <Form.Item name="name" label="Nombre">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form onFinish={editFacultie} initialValues={{ name: props.register.name }}>
      <Form.Item name="name" label="Nombre">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Editar
        </Button>
        <Button
          htmlType="submit"
          onClick={DeleteFaculties}
          loading={isSubmitting}
        >
          Eliminar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FacultiesForm
