import React from 'react'
import withAuth from '../hocs/withAuth'
import { useParams } from 'react-router-dom'
import InternshipHeader from '../components/IntershipsHeader'
import { useAuth } from '../providers/Auth'
import ReportStudentSection from '../components/ReportStudentSection'
import { useInternship } from '../data/useInternship'
import ShowError from '../components/ShowError'
import ReportRepresentativeSection from '../components/ReportRepresentativeSection'
import ReportTutorSection from '../components/ReportTutorSection'
import ReportCommissionSection from '../components/ReportCommissionSection'
import ReportAdministrativeSection from '../components/ReportAdministrativeSection'

const InternshipPage = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const { internship, isLoading, isError } = useInternship(id)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <ShowError error={isError} />
  }
  return (
    <>
      <InternshipHeader internship={internship} />
      <ReportStudentSection internship={internship} />
      <ReportRepresentativeSection internship={internship} />
      <ReportTutorSection internship={internship} />
      <ReportCommissionSection internship={internship} />
      <ReportAdministrativeSection internship={internship} />
    </>
  )
}

export default withAuth(InternshipPage)
