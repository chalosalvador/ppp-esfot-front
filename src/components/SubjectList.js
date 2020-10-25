import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
const SubjectList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList("subjects");

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ID_CARRERA - b.ID_CARRERA,
        },
        {
            title: 'NOMBRE',
            dataIndex: 'name',
        },
        {
            title: 'CODIGO',
            dataIndex: 'code',
        },
        {
            title: 'NIVEL',
            dataIndex: 'level',
        },
        {
            title: 'UNIDAD',
            dataIndex: 'unit',
        },        {
            title: 'DESCRIPCION',
            dataIndex: 'field',
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
        <div>
            <TableDefault columns={columns} title='MATERIAS' dataSource={dataSearch}/>
        </div>


    )
}

export default SubjectList;