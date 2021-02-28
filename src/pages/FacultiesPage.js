import React, {useState} from 'react';
import { Card } from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import FacultiesList from '../components/FacultiesList';


const FacultiesPage = () => {


    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='FacultiesForm' title='NUEVA FACULTAD'/>}>
                <FacultiesList form='FacultiesForm'/>
                </Card>  
            </ModalContextProvider>

            
        </>
    )
}

export default withAuth(FacultiesPage);