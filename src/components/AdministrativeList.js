import React, {useContext, useEffect} from 'react';
import { Button, Table} from 'antd';
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {useDataList} from "../data/useDataList";
import {Search} from "./Search";
const AdministrativeList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('administratives');


    const columns = [
        {
            title: 'Id',
            dataIndex: 'administrative_id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.administrative_id - b.administrative_id,
        },
        {
            title: 'FACULTAD',
            dataIndex: 'faculty',
            ...Search('faculty'),
            sorter: (a, b) => a.faculty.length - b.faculty.length,
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
            <TableDefault columns={columns} title='ADMINISTRADORES' dataSource={dataSearch}/>
        </div>

    )
}

export default AdministrativeList;