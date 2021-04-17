import React from 'react'
import { Card } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'
import CarrierList from '../components/CarrierList'

const CarrierPage = () => {
  return (
    <>
      <ModalContextProvider>
        <Card
          title={<h3>CARRERAS</h3>}
          extra={<Actions form="CarrierForm" title="NUEVA CARRERA" />}
        >
          <CarrierList form="CarrierForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(CarrierPage)
