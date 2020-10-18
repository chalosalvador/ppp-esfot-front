import React, {useContext, useEffect} from 'react'; 
import { Button, Table} from 'antd';
import {useFacultiesList} from '../data/useFacultiesList'
import ModalContext from '../context/ModalContext';
import API from "../data";
const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {faculties} = useFacultiesList();

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
    console.log(faculties);
    return (
        <Table dataSource={faculties} columns={columns}/>
    )
}

export default FacultiesList;