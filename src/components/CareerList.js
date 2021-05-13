import React, { useContext, useEffect, useState } from 'react'
import { Button, Empty, Popconfirm, Table, Select, Divider, Col } from 'antd'
import { useDataList } from '../data/useDataList'
import ModalContext from '../context/ModalContext'
import TableDefault from './TableDefault'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
const { Option } = Select

const CareerList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('careers')
  const [currentCareer, setCurrentCareer] = useState([{}])
  const [currentCareer2, setCurrentCareer2] = useState([
    {
      id: 1,
      name: '',
      pensum: 2007,
      levels: 5,
      faculty_id: 1,
      status: 'active',
    },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteCareers = async (record) => {
    setIsSubmitting(true)
    await deleteObject('careers', record.id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeCareer = (value) => {
    dataSearch.map((career) => {
      if (career.status == 'active') {
        setCurrentCareer((currentCareer) => [...currentCareer, career])
      }
    })
  }
  const columns = [
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Carrera',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pensum',
      dataIndex: 'pensum',
      key: 'pensum',
    },
    {
      title: 'Nivel',
      dataIndex: 'levels',
      key: 'levels',
    },
    {
      title: 'Facultad',
      dataIndex: ['faculty', 'name'],
      key: 'faculty_id',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
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
            onConfirm={() => deleteCareers(record)}
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
    <>
      <Divider orientation="right">
        <Button
          onClick={() => {
            handleChangeCareer('disabled')
          }}
          size="middle"
        >
          Mostrar registros Actuales
        </Button>
      </Divider>
      <Table
        dataSource={currentCareer}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        onChange={handleChangeCareer}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay carreras registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default CareerList
