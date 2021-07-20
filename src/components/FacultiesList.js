import React, { useContext, useEffect, useState, Space, useRef } from 'react'
import { Button, Empty, Table, Popconfirm, Input, Tag } from 'antd'
import { useDataList } from '../data/useDataList'
import ModalContext from '../context/ModalContext'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const FacultiesList = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef < Input > (null)

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.current && searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();

    setSearchText('');

  };

  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } =
    useDataList('faculties')
  const [dataSource, setDataSource] = useState(dataSearch)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const [tags, setTags] = useState("")
  const deleteFaculty = async (record) => {
    setIsSubmitting(true)
    await deleteObject('faculties', record.id)
    setIsSubmitting(false)
    setShowModal(false)
  }
  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      setTags(...tags, val)

    }
  }

  console.log(tags)

  const FilterByNameInput = (
    <Input
      placeholder="Buscar por nombre"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value
        setValue(currValue)
        const filteredData = dataSearch.filter((entry) =>
          entry.name.includes(currValue)
        )
        setDataSource(filteredData)
      }}
    />
  )

  const columns = [
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: "Nombre",
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
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
            onConfirm={() => deleteFaculty(record)}
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
    <div>
      <input type="text" onKeyDown={inputKeyDown} />
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
    </div>
  )
}

export default FacultiesList
