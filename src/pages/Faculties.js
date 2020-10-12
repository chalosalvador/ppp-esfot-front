import React, {useState} from 'react';
import {Form, Input, Select, Button, Card, Table, Modal} from 'antd';
import {useFacultiesList} from '../data/useFacultiesList'
import FacultiesFormModal from '../components/FacultiesFormModal';
import InternshipFormModal from '../components/InternshipFormModal';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import FacultiesList from '../components/FacultiesList';


const Faculties = () => {

    return (
        <>
            <ModalContextProvider>
                <Card title={<h3>FACULTADES</h3>} extra={<Actions form='FacultiesForm'/>}>        
                <FacultiesList form='FacultiesForm'/>      
                </Card>  
            </ModalContextProvider>

            
        </>
    )
}

export default withAuth(Faculties);