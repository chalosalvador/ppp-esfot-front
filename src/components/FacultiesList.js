import React, {useContext, useEffect} from 'react'; 
import {Form, Input, Select, Button, Card, Table, Modal} from 'antd';
import {useFacultiesList} from '../data/useFacultiesList'
import ModalContext from '../context/ModalContext';
const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (record, form) => {

        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
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
                <Button onClick={()=>{DataSet(record,props.form)}} size="middle">
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