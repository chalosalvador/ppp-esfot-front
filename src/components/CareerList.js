import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
const CareerList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('careers');

    const columns = [
        {
            id: 'Código',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Carrera',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Pensum',
            dataIndex: 'pensum',
            key: 'pensum',
        },
        {
            title: 'Nivel',
            dataIndex: 'levels',
            key: 'levels',
        },
        {
            title: 'Facultad',
            dataIndex: 'faculty_id',
            key: 'faculty_id',
        },

        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={()=>{setShowModal(true); setEdit(true); setRegister(record); setForm(props.form) }} size="middle">
                        Editar
                    </Button>
                    <Button size="middle">
                        Eliminar
                    </Button>
                </>
            ),
        },
    ]
    console.log(dataSearch);
    return (
        <TableDefault columns={columns} title='CARRERAS' dataSource={dataSearch}/>
    )
}

export default CareerList;