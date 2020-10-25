import React from 'react';
import {Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';

import TeacherList from "../components/TeacherList";

const TeacherPage = () => {
    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='TeacherForm' title='AGREGAR LISTA DE PROFESORES'/>}>
                    <TeacherList form='TeacherForm'/>
                </Card>
            </ModalContextProvider>

        </>
    )
}

export default withAuth(TeacherPage);