import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import {useCareersList} from '../data/useCareersList'
import ModalContext from '../context/ModalContext';
const CareerList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {careers} = useCareersList();

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
    console.log(careers);
    return (
        <Table dataSource={careers} columns={columns}/>
    )
}

export default CareerList;
