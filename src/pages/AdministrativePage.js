import React from 'react';
import {Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';

import AdministrativeList from "../components/AdministrativeList";

const AdministrativePage = () => {
    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='AdministrativeForm' title='AGREGAR LISTA DE ADMINISTRADORES'/>}>
                    <AdministrativeList form='AdministrativeForm'/>
                </Card>
            </ModalContextProvider>


        </>
    )
}

export default withAuth(AdministrativePage);