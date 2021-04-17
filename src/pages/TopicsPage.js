<<<<<<< HEAD
import React, { useState } from 'react'
import { Card } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'
import TableDefault from '../components/TableDefault'

const Topics = () => {
  const [Carrier, setCarrier] = useState([])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'ID_CARRERA',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ID_CARRERA - b.ID_CARRERA,
    },

    {
      title: 'TEMA',
      dataIndex: 'TEMA',
    },
    {
      title: 'CODIGO',
      dataIndex: 'CODIGO',
    },
    {
      title: 'DESCRIPCION',
      dataIndex: 'DESCRIPCION',
    },
    {
      title: 'NIVEL',
      dataIndex: 'NIVEL',
    },
  ]
  return (
    <>
      <ModalContextProvider>
        <Card
          title={<h3>TEMAS</h3>}
          extra={<Actions form="FacultiesForm" title="NUEVO TEMA" />}
        >
          <TableDefault columns={columns} cards={Carrier} />
        </Card>
      </ModalContextProvider>
    </>
  )
=======
import React from 'react';
import {Card } from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import TopicList from "../components/TopicList";



const Topics = () => {
    return (
        <>
            <ModalContextProvider>
                <Card title={<h3>TEMAS</h3>} extra={<Actions form='TopicForm' title='NUEVO TEMA'/>}>
                    <TopicList form='TopicForm'/>
                </Card>
            </ModalContextProvider>


        </>
    )
>>>>>>> dev
}

export default withAuth(Topics)
