import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {useDataList} from "../data/useDataList";
const AdministrativeList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('administratives');


    const columns = [
        {
            title: 'Id',
            dataIndex: 'administrative_id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.ID_CARRERA - b.ID_CARRERA,
        },
        {
            title: 'FACULTAD',
            dataIndex: 'faculty_id',
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
            <TableDefault columns={columns} title='ADMINISTRADORES' dataSource={dataSearch}/>
        </div>

    )
}

export default AdministrativeList;