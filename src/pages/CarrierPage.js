import React, {useState} from 'react';
import { Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import TableDefault from "../components/TableDefault";
import CarrierList from '../components/CarrierList';


const CareerPage = () => {

    return (
        <>
            <ModalContextProvider>
                <Card title={<h3>CARRERAS</h3>} extra={<Actions form='CarrierForm' title='NUEVA CARRERA'/>}>

                    <CarrierList form='CarrierForm'/>
                </Card>
            </ModalContextProvider>


        </>
    )
}

export default withAuth(CareerPage);
