import React from 'react';
import withAuth from '../hocs/withAuth';
import { useParams } from 'react-router-dom';
import InternshipDetail from '../components/InternshipDetail';
import InternshipReportsList from '../components/InternshipReportsList';

const InternshipPage = () => {
  let { id } = useParams();

  return (
    <>
      <InternshipDetail id={ id } />
      <InternshipReportsList id={ id } />
    </>
  );

};

export default withAuth( InternshipPage );
