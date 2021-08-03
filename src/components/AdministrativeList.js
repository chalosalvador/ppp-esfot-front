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
      ...getColumnSearchProps('faculty'),
    },
    {
      title: 'Estado',
      dataIndex: ['administrative', 'status'],
      key: ['administrative', 'status'],
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
