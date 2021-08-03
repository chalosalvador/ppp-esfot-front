import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button, Empty, Popconfirm, Input, Table, Select, Divider, Col, Tag, Space } from 'antd'
import { useDataList } from '../data/useDataList'
import ModalContext from '../context/ModalContext'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
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

  //-------------- estos son los campos que se utilizan para la busqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null); //esta referencia encontre en stackoverflow
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
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Carrera',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Pensum',
      dataIndex: 'pensum',
      key: 'pensum',
      ...getColumnSearchProps('pensum'),
    },
    {
      title: 'Nivel',
      dataIndex: 'levels',
      key: 'levels',
      ...getColumnSearchProps('levels'),
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
      {/* 
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
 
*/}

      <Table
        dataSource={dataSearch}
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
