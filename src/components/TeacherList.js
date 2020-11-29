import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {useDataList} from "../data/useDataList";
import {Search} from "./Search";
const TeacherList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('teachers');


    const columns = [
        {
            title: 'Id',
            dataIndex: 'teacher_id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.teacher_id - b.teacher_id,
        },
        {
            title: 'CARRERA',
            dataIndex: 'career',
            ...Search('career'),
            sorter: (a, b) => a.career.length - b.career.length,

        },
        {
            title: 'GRADO',
            dataIndex: 'degree',
            ...Search('degree'),
            sorter: (a, b) => a.degree.length - b.degree.length,
        },
        {
            title: 'NOMBRES',
            dataIndex: "name",
            ...Search('name'),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'APELLIDOS',
            dataIndex: 'lastname',
            ...Search('lastname'),
            sorter: (a, b) => a.lastname.length - b.lastname.length,
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            ...Search('email'),
        },
        {
            title: 'TELEFONO',
            dataIndex: 'phone',
            ...Search('phone'),

        },
        {
            title: 'CELULAR',
            dataIndex: 'mobile',
            ...Search('mobile'),
        },
        {
            title: 'GENERO',
            dataIndex: 'sex',
            ...Search('sex'),
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
            <TableDefault columns={columns} title='PROFESORES' dataSource={dataSearch}/>
        </div>

    )
}

export default TeacherList;