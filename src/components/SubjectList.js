import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {Search} from "./Search";
const SubjectList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList("subjects");

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'NOMBRE',
            dataIndex: 'name',
            ...Search('name'),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'CODIGO',
            dataIndex: 'code',
        },
        {
            title: 'NIVEL',
            dataIndex: 'level',
            ...Search('level'),
            sorter: {
                compare: (a, b) => a.level - b.level,
                multiple: 1,
            },
        },
        {
            title: 'UNIDAD',
            dataIndex: 'unit',
            ...Search('unit'),
            sorter: (a, b) => a.unit.length - b.unit.length,

        },        {
            title: 'DESCRIPCION',
            dataIndex: 'field',
            ...Search('field'),
            sorter: (a, b) => a.field.length - b.field.length,
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