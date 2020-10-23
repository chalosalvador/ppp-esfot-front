import React, {useContext, useEffect} from 'react'; 
import { Button, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';

const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('faculties');

    const columns = [
        {
        id: 'Código',
        dataIndex: 'id',
        key: 'id'
        },
        {
        title: 'Facultad',
        dataIndex: 'name',
        key: 'name',
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
        <Table dataSource={dataSearch} columns={columns}/>
    )
}

export default FacultiesList;