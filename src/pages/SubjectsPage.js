import React, {useState} from 'react';
import {Card, } from 'antd';
import withAuth from '../hocs/withAuth';
import ModalContext, { ModalContextProvider } from '../context/ModalContext';
import Actions from '../components/Actions';
import TableDefault from "../components/TableDefault";



const Subjects = () => {
    const [Carrier, setCarrier] = useState([]);
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

    ];
    return (
        <>
            <ModalContextProvider>
                <Card title={<h3>MATERIAS</h3>} extra={<Actions form='FacultiesForm' title='NUEVA MATERIA'/>}>
                    <TableDefault columns={columns} cards={Carrier}/>
                </Card>
            </ModalContextProvider>


        </>
    )
}

export default withAuth(Subjects);