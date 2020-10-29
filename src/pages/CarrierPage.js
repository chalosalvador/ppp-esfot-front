import React from 'react';
import { Card} from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import CarrierList from '../components/CarrierList';
import PropTypes from "prop-types";

const CarrierPage = () => {
    return (
        <>
            <ModalContextProvider>
                <Card extra={<Actions form='CarrierForm' title='NUEVA CARRERA'/>}>
                    <CarrierList form='CarrierForm' />
                </Card>
            </ModalContextProvider>
        </>
    )
}


export default withAuth( CarrierPage);