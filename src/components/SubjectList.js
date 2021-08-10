import React, { useContext, useState, useRef } from 'react'
import { Button, Select, Table, Divider, Empty, Popconfirm, Tag} from 'antd'
import { useDataList } from '../data/useDataList'
import { deleteObject } from '../utils/formActions'
import ModalContext from '../context/ModalContext'
import ShowError from './ShowError'
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const { Option } = Select

const SubjectList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('careers')
  const [currentSubjects, setCurrentSubjects] = useState([])
  const [currentCareerId, setCurrentCareerId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteSubject = async (record) => {
    setIsSubmitting(true)
    await deleteObject('subjects', record.id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeCareer = (value) => {
    setCurrentCareerId(value)
    dataSearch.map((career) => {
      if (career.id == value) {
        setCurrentSubjects(career.subjects)
      }
    })
  }
  const handleChangeStatus = (record) => {
    if (record == "active") {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">Activo</Tag>
      )
    } else {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">Desactivado</Tag>
      )
    }
  }

  const columns = [
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NOMBRE',
      dataIndex: 'name',
      key: 'name',
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'CODIGO',
      dataIndex: 'code',
      key: 'code',
      ...GetColumnSearchProps('code'),
    },
    {
      title: 'NIVEL',
      dataIndex: 'level',
      key: 'level',
      ...GetColumnSearchProps('level'),
    },
    {
      title: 'UNIDAD',
      dataIndex: 'unit',
      key: 'unit',
      ...GetColumnSearchProps('unit'),
    },
    {
      title: 'ESTADO',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Activos',
          value: 'active',
        },
        {
          text: 'Desactivados',
          value: 'disabled',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => (
        <>
          {handleChangeStatus(record)}

        </>
      )
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <>
          <div style={{ display: 'none' }}>
            {(record['career_id'] = currentCareerId)}
          </div>
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
            onConfirm={() => deleteSubject(record)}
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
        <Select
          showSearch
          style={{ width: 240 }}
          placeholder="Seleccione una carrera"
          onChange={handleChangeCareer}
          loading={isLoading}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {dataSearch.map((career, i) => (
            <Option key={i} value={career.id}>
              {career.name}
            </Option>
          ))}
        </Select>
      </Divider>
      <Table
        dataSource={currentSubjects}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay materias registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default SubjectList
