import React from 'react';
import withAuth from '../hocs/withAuth';
import { useParams } from 'react-router-dom';
import InternshipDetail from '../components/InternshipDetail';
import InternshipReportsList from '../components/InternshipReportsList';
import { useAuth } from '../providers/Auth';
import ReportStudentSectionFormModal from '../components/ReportStudentSectionFormModal';
import { Alert, Divider } from 'antd';
import { useInternship } from '../data/useInternship';
import ShowError from '../components/ShowError';

const InternshipPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { internship, isLoading, isError } = useInternship( id );

  if( isLoading ) {
    return <div>Cargando...</div>;
  }

  if( isError ) {
    return <ShowError error={ isError } />;
  }
  return (
    <>
      <InternshipDetail internship={ internship } />

      <Divider orientation='center'
               style={ {
                 marginTop: 40,
                 marginBottom: 40
               } }><strong>REPORTES REGISTRADOS</strong></Divider>

      {
        currentUser.role === 'ROLE_STUDENT'
          ?
          internship.status === 'in_progress'
            ? <ReportStudentSectionFormModal internshipId={ id } />
            : internship.status === 'pending'
            ? <Alert message='Pendiente de autorización'
                     description='Estas prácticas deben ser autorizadas antes de que puedas registrar reportes.'
                     type='warning'
                     showIcon />
            : internship.status === 'final_report_sent'
              ? <Alert message='Reporte final enviado'
                       description='Ya has enviado el reporte final para estas prácticas, no es posible registrar más reportes.'
                       type='info'
                       showIcon />
              : null
          : null
      }

      <InternshipReportsList internshipId={ id } />
    </>
  );

};

export default withAuth( InternshipPage );
