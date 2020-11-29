import React, {useContext} from 'react';
import { Button} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import { Search } from "../components/Search"

function CarrierList  (props) {

    
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('careers')

    const columns = [
        {
            id: 'Código',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Carrera',
            dataIndex: 'name',
            key: 'name',
            ...Search('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Pensum',
            dataIndex: 'pensum',
            key: 'pensum',
            ...Search('pensum'),
            sorter: {
                compare: (a, b) => a.pensum - b.pensum,
                multiple: 1,
            },
        },
        {
            title: 'Nivel',
            dataIndex: 'levels',
            key: 'levels',
            ...Search('levels'),
            sorter: {
                compare: (a, b) => a.levels - b.levels,
                multiple: 1,
            },
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

export default CarrierList;