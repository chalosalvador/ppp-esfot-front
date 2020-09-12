import React from 'react';
import withAuth from '../hocs/withAuth';
import { useParams } from 'react-router-dom';
import InternshipDetail from '../components/InternshipDetail';
import InternshipReportsList from '../components/InternshipReportsList';
import { useAuth } from '../providers/Auth';
import CreateReportModal from '../components/CreateReportModal';
import { Divider } from 'antd';

const InternshipPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  return (
    <>
      <InternshipDetail id={ id } />

      <Divider orientation='center' style={{marginTop: 40}}><strong>REPORTES REGISTRADOS</strong></Divider>
      { currentUser.role === 'ROLE_STUDENT' && <CreateReportModal internshipId={ id } /> }
      <InternshipReportsList id={ id } />
    </>
  );

};

export default withAuth( InternshipPage );
