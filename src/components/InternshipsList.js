import React, { useState } from 'react';
import { Card, Col, Row, Skeleton, Table } from 'antd';
import { useInternshipsList } from '../data/useInternshipsList';
import ShowError from './ShowError';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';

const InternshipsList = ( props ) => {
  const [ pageIndex, setPageIndex ] = useState( 1 );
  const { internships, links, meta, isLoading, isError, mutate } = useInternshipsList( pageIndex );

  const columns = [
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
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
      title: 'Estudiante',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
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
      render: (value, internship)=>{
        return <Link to={Routes.INTERNSHIP_ID.replace( ':id', internship.key )}>Ver detalles</Link>
      }
    },
  ];

  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false
  };


  if( isError ) {
    return <ShowError error={ isError } />;
  }

  const getDataSource = () => {
    console.log( 'internships', internships );
    if( internships ) {
      return internships.map( ( internship ) => ({
          key: internship.id,
          created_at: moment( internship.created_at ).format( 'DD/MM/YYYY' ),
          start_date: moment( internship.start_date ).format( 'DD/MM/YYYY' ),
          finish_date: internship.finish_date && moment( internship.finish_date ).format( 'DD/MM/YYYY' ),
          type: internship.type,
          student: `${ internship.student.name } ${ internship.student.lastname }`,
          tutor: internship.teacher && `${ internship.teacher.name } ${ internship.teacher.lastname }`,
          status: internship.status,
        })
      );
    } else {
      return [];
    }
  };

  if( meta ) {
    pagination = {
      current: meta.current_page,
      pageSize: meta.per_page,
      total: meta.total,
      showSizeChanger: false
    };
  }

  return <Table
    dataSource={ getDataSource() }
    columns={ columns }
    rowKey={ record => record.id }
    pagination={ pagination }
    loading={ isLoading }
    onChange={ ( pagination ) => setPageIndex( pagination.current ) }
  />;
};

export default InternshipsList;
