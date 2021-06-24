import React, { useState } from 'react'
import { Empty, Table } from 'antd'
import { useInternshipsList } from '../data/useInternshipsList'
import ShowError from './ShowError'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Routes from '../constants/routes'
import { useAuth } from '../providers/Auth'

const InternshipsList = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const { internships, meta, isLoading, isError } =
    useInternshipsList(pageIndex)
  const { currentUser } = useAuth()

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
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'finish_date',
      key: 'finish_date',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
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
