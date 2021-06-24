import React, { useContext, useEffect, useState } from 'react'
import { Button, Empty, Popconfirm, Table } from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
const AdministrativeList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('administratives')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deleteAdministrative = async (record) => {
    setIsSubmitting(true)
    await deleteObject('administratives', record.administrative_id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  console.log(dataSearch)
  const columns = [
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: ['administrative', 'name'],
      key: ['administrative', 'name'],
    },
    {
      title: 'Apellido',
      dataIndex: ['administrative', 'lastname'],
      key: ['administrative', 'lastname'],
    },
    {
      title: 'Facultad',
      dataIndex: 'faculty',
      key: 'faculty',
    },
    {
      title: 'Estado',
      dataIndex: ['administrative', 'status'],
      key: ['administrative', 'status'],
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              DataSet(record, props.form)
            }}
            size="middle"
            
          >
            Editar
          </Button>
          <Popconfirm
            title="Desea eliminar el dato?"
            onConfirm={() => deleteAdministrative(record)}
            
          >
            <Button size="middle">Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  if (isError) {
    return <ShowError error={isError} />
  }

  return (
    <Table
      dataSource={dataSearch}
      columns={columns}
      rowKey={(record) => record.id}
      loading={isLoading}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay administrativos registradas</span>}
          />
        ),
      }}
    />
  )
}

export default AdministrativeList
