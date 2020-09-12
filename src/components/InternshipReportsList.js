/**
 * Created by chalosalvador on 9/9/20
 */
import React, { useState } from 'react';
import { useInternshipReportsList } from '../data/useInternshipReportsList';
import ShowError from './ShowError';
import { Divider, Row, Col, Drawer, Table, Button } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';
import InternshipReportDetail from './InternshipReportDetail';

const InternshipReportsList = ( { id } ) => {
  const { reports, isLoading, isError } = useInternshipReportsList( id );
  const [ report, setReport ] = useState( null );

  const columns = [
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'from_date',
      key: 'from_date',
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'to_date',
      key: 'to_date',
    },
    {
      title: 'Horas trabajadas',
      dataIndex: 'hours_worked',
      key: 'hours_worked',
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
      render: ( value, internshipReport ) => {
        return <Button type='link' onClick={ () => handleViewReportDetail( internshipReport ) }>Ver detalles</Button>;
      }
    },
  ];

  const handleViewReportDetail = ( internshipReport ) => {
    console.log( 'internshipReport', internshipReport );
    setReport( internshipReport );
  };

  if( isLoading ) {
    return <div>Cargando...</div>;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }

  const getDataSource = () => {
    if( reports ) {
      return reports.map( ( report ) => ({
          ...report,
          key: report.id,
          created_at: moment( report.created_at ).format( 'DD/MM/YYYY HH:mm:ss' ),
          from_date: moment( report.from_date ).format( 'DD/MM/YYYY' ),
          to_date: report.to_date && moment( report.to_date ).format( 'DD/MM/YYYY' ),
          hours_worked: report.hours_worked,
          status: report.status,
        })
      );
    } else {
      return [];
    }
  };

  return (
    <>
      <Table
        dataSource={ getDataSource() }
        columns={ columns }
        rowKey={ record => record.id }
        loading={ isLoading }
        // pagination={ pagination }
        // onChange={ ( pagination ) => setPageIndex( pagination.current ) }
      />
      <Drawer
        closable={ false }
        onClose={ () => setReport( null ) }
        visible={ !!report }
        placement='right'
        // height='80%'
        width='1100px'
        destroyOnClose
      >
        <InternshipReportDetail report={ report } />
      </Drawer>
    </>
  );
};

export default InternshipReportsList;
