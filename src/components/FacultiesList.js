import React, {useContext, useEffect} from 'react'; 
import { Button, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {Search} from "./Search";



const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch} = useDataList('faculties');
    const DataSet = (record, form) => {

        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
    const columns = [
        {
        id: 'Código',
        dataIndex: 'id',
        key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
        title: 'Facultad',
        dataIndex: 'name',
        key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...Search('name'),
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
    console.log(dataSearch);
    return (
        <TableDefault columns={columns} title='FACULTADES' dataSource={dataSearch}/>
    )
}

export default FacultiesList;