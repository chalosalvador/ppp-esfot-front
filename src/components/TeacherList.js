import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {useDataList} from "../data/useDataList";
const TeacherList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('teachers');


    const columns = [
        {
            title: 'Id',
            dataIndex: 'teacher_id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ID_CARRERA - b.ID_CARRERA,
        },
        {
            title: 'GRADO',
            dataIndex: 'degree',
        },
        {
            title: 'CARRERA',
            dataIndex: 'career_id',
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