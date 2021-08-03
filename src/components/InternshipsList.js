import React, { useState, useRef } from 'react'
import { Button, Empty, Table, Tag, Space, Input } from 'antd'
import { useInternshipsList } from '../data/useInternshipsList'
import ShowError from './ShowError'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Routes from '../constants/routes'
import { useAuth } from '../providers/Auth'
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
const InternshipsList = () => {
  //-------------- estos son los campos que se utilizan para la busqueda
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null); // stackoverflow
  //--------------
  const [pageIndex, setPageIndex] = useState(1)
  const { internships, meta, isLoading, isError } =
    useInternshipsList(pageIndex)
  const { currentUser } = useAuth()
  const handleChangeStatus = (record) => {

    if ((record + "") == "undefined") {
      return (
        <div>
          <Tag icon={<CloseCircleOutlined />} color="error">Sin tutor </Tag>

        </div>
      )
    } else {
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="success">{record}</Tag>

        </div>
      )
    }
  }
  const columns = [
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Estudiante',
      dataIndex: 'student',
      key: 'student',
      ...getColumnSearchProps('student'),
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      ...getColumnSearchProps('company'),
    },
    {

      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
      ...getColumnSearchProps('tutor'),
      render: (record) => (
        <>
          {handleChangeStatus(record)}

        </>
      )

    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'start_date',
      key: 'start_date',
      ...getColumnSearchProps('start_date'),
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'finish_date',
      key: 'finish_date',
      ...getColumnSearchProps('finish_date'),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (value, internship) => {
        return (
          <Link to={Routes.INTERNSHIP_ID.replace(':id', internship.key)}>
            Ver detalles
          </Link>
        )
      },
    },
  ]

  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false,
  }

  if (isError) {
    return <ShowError error={isError} />
  }
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
        (record[dataIndex] + "").toString().toLowerCase().includes(value.toLowerCase()),
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
            textToHighlight={(text + "").toString()}
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

  const getDataSource = () => {
    if (internships) {
      return internships.map((internship) => ({
        key: internship.id,
        created_at: moment(internship.created_at).format('DD/MM/YYYY HH:mm:ss'),
        start_date: moment(internship.start_date).format('DD/MM/YYYY'),
        finish_date:
          internship.finish_date &&
          moment(internship.finish_date).format('DD/MM/YYYY'),
        type: internship.type,
        student: `${internship.student.name} ${internship.student.lastname}`,
        tutor:
          internship.teacher &&
          `${internship.teacher.name} ${internship.teacher.lastname}`,
        company: internship.company && internship.company.name,
        status: internship.status,
      }))
    } else {
      return []
    }
  }

  if (meta) {
    pagination = {
      current: meta.current_page,
      pageSize: meta.per_page,
      total: meta.total,
      showSizeChanger: false,
    }
  }

  return (
    <Table
      dataSource={getDataSource()}
      columns={columns}
      rowKey={(record) => record.key}
      pagination={pagination}
      loading={isLoading}
      onChange={(pagination) => setPageIndex(pagination.current)}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>No hay prácticas preprofesionales registradas</span>
            }
          />
        ),
      }}
    />
  )
}

export default InternshipsList
