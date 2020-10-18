import React from 'react';
import {Card, } from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';

import SubjectList from '../components/SubjectList';

const Subjects = () => {
    return (
        <>
            <ModalContextProvider>
                <Card title={<h3>MATERIAS</h3>} extra={<Actions form='SubjectForm' title='NUEVA MATERIA'/>}>
                    <SubjectList form='SubjectForm'/>
                </Card>
            </ModalContextProvider>


        </>
    )
}

export default withAuth(Subjects);