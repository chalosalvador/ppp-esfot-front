import React, {useContext} from 'react';
import { Button} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {Search} from "./Search";


const SubjectList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList("topics");

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
            title: 'Materia',
            dataIndex: 'subject_id',
            ...Search('subject_id'),
            sorter: (a, b) => a.subject_id.length - b.subject_id.length,
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
            <TableDefault columns={columns} title='TEMAS' dataSource={dataSearch}/>
        </div>

    )
}

export default SubjectList;