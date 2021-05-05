import React, {useContext, useEffect, useState} from 'react';
import {Button, Empty, Popconfirm, Table} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import ShowError from './ShowError';
import {deleteObject} from "../utils/formActions";
const CareerList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (record, form) => {
        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
    const {dataSearch, isLoading, isError} = useDataList('careers');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const deleteCareers = async (record) => {
        setIsSubmitting(true);
        await deleteObject("careers", record.id);
        setIsSubmitting(false);
        setShowModal(false);
    };

    const columns = [
        {
            id: 'Código',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Carrera',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Pensum',
            dataIndex: 'pensum',
            key: 'pensum',
        },
        {
            title: 'Nivel',
            dataIndex: 'levels',
            key: 'levels',
        },
        {
            title: 'Facultad',
            dataIndex: ['faculty', 'name'],
            key: 'faculty_id',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={()=>{DataSet(record,props.form)}} size="middle">
                        Editar
                    </Button>
                    <Popconfirm title="Desea eliminar el dato?" onConfirm={() => deleteCareers(record)}>
                        <Button size="middle">Eliminar</Button>
                    </Popconfirm>
                </>
            ),
        },
    ]

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    return (
        <Table
            dataSource={ dataSearch }
            columns={ columns }
            rowKey={ record => record.id }
            loading={ isLoading }
            locale={
                {
                    emptyText: <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }
                                      description={ <span>No hay carreras registradas</span> }
                    />
                }
            }
    />
    )
}

export default CareerList;
