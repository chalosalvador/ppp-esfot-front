import React from 'react';
import {Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import StudentList from '../components/StudentList'

const StudentPage = () => {
    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='StudentForm' title='AGREGAR LISTA DE ESTUDIANTES'/>}>
                    <StudentList form='StudentForm'/>
                </Card>
            </ModalContextProvider>


        </>
    )
}

export default withAuth(StudentPage);