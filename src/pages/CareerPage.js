import React from 'react';
import { Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import CareerList from '../components/CareerList';
import PropTypes from "prop-types";

const CareerPage = () => {
    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='CareerForm' title='NUEVA CARRERA'/>}>
                    <CareerList form='CareerForm' />
                </Card>
            </ModalContextProvider>
        </>
    )
}


export default withAuth( CareerPage);