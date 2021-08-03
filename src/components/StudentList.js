import React, { useContext, useState, useRef } from 'react'
import {
  Button,
  Empty,
  Popconfirm,
  Table,
  message,
  Divider,
  Row,
  Col,
  Tag, Space,
  Input
} from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import { deleteObject } from '../utils/formActions'
import ShowError from './ShowError'
import API from '../data'
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
const StudentList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('students')
  const [isSubmitting, setIsSubmitting] = useState(false)
  //UPLOAD FILE
  const [fileData, setFileData] = useState('')
  const handleChange = (file) => {
    setFileData(file[0])
  }

  const submitData = async (e) => {
    e.preventDefault()
    const fData = new FormData()
    fData.append('file', fileData)
    await API.post('/students/uploadImportFile', fData)
    message.success('Los datos de los estudiante se han cargado con exito...')
  }
  //END UPLOAD FILE
  const deleteStudent = async (record) => {
    setIsSubmitting(true)
    await deleteObject('students', record.student_id)
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
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: 'Nombre',
      dataIndex: ['student', 'name'],
      key: ['student', 'name'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Apellido',
      dataIndex: ['student', 'lastname'],
      key: ['student', 'lastname'],
    },
    {
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
      ...getColumnSearchProps('career'),
    },
    {
      title: 'Facultad',
      dataIndex: 'faculty',
      key: 'faculty',
      ...getColumnSearchProps('faculty'),
    },
    {
      title: 'Estado',
      dataIndex: ['student', 'status'],
      key: ['student', 'status'],
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
            onConfirm={() => deleteStudent(record)}
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
        (record[dataIndex]).toString().toLowerCase().includes(value.toLowerCase()),
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
      <Row justify="end">
        <Col>
          <form onSubmit={submitData}>
            <label>Seleccionar un archivo</label>
            <input
              key="file"
              name="file"
              type="file"
              onChange={(e) => handleChange(e.target.files)}
            />
            <button key="submit" type="submit" onClick={submitData}>
              Cargar archivo
            </button>
          </form>
        </Col>
      </Row>

      <Divider orientation={'center'} />
      <Table
        dataSource={dataSearch}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay estudiantes registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default StudentList
