import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  Button, Empty, Popconfirm, Table, Tag, Space,
  Input
} from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
import Highlighter from 'react-highlight-words';

import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
const TeacherList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('teachers')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteTeacher = async (record) => {
    setIsSubmitting(true)
    await deleteObject('teachers', record.teacher_id)
    setIsSubmitting(false)
    setShowModal(false)
  }
  //-------------- estos son los campos que se utilizan para la busqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null); // stackoverflow
  //--------------
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
      dataIndex: 'teacher_id',
      key: 'teacher_id',
    },
    {
      title: 'Nombre',
      dataIndex: ['teacher', 'name'],
      key: ['teacher', 'name'],
    },
    {
      title: 'Apellido',
      dataIndex: ['teacher', 'lastname'],
      key: ['teacher', 'lastname'],
    },
    {
      title: 'Profesión',
      dataIndex: 'degree',
      key: 'degree',
      ...getColumnSearchProps('degree'),
    },
    {
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
      ...getColumnSearchProps('career'),
    },
    {
      title: 'Estado',
      dataIndex: ['teacher', 'status'],
      key: ['teacher', 'status'],
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
            onConfirm={() => deleteTeacher(record)}
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
  console.log(dataSearch)
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
            description={<span>No hay facultades registradas</span>}
          />
        ),
      }}
    />
  )
}

export default TeacherList
