import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button, Form, Input, Select, Table, Divider, Row, Col, Empty, Popconfirm, Tag, Space } from 'antd'
import { useDataList } from '../data/useDataList'
import { useCareersList } from '../data/useCareersList'
import { deleteObject } from '../utils/formActions'
import ModalContext from '../context/ModalContext'
import TableDefault from './TableDefault'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import ShowError from './ShowError'
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
const { Option } = Select

const SubjectList = (props) => {
  const [contador, setContador] = useState(0)
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
  //-------------- estos son los campos que se utilizan para la busqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null); // stackoverflow
  //--------------
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
      ...getColumnSearchProps('name'),
    },
    {
      title: 'CODIGO',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
    },
    {
      title: 'NIVEL',
      dataIndex: 'level',
      key: 'level',
      ...getColumnSearchProps('level'),
    },
    {
      title: 'UNIDAD',
      dataIndex: 'unit',
      key: 'unit',
      ...getColumnSearchProps('unit'),
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
  //------------------------------------------------------------------------------- inicio de busqueda
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}

            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Restablecer
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    }
  };
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  };
  //------------------------------------------------------------------------------- fin de busqueda
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
