import React, {useContext, useEffect, useState} from 'react';
import {Button, Empty, Popconfirm, Table} from 'antd';
import ModalContext from '../context/ModalContext';
import {useDataList} from "../data/useDataList";
import ShowError from "./ShowError";
import {deleteObject} from "../utils/formActions";
const TeacherList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (record, form) => {
        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
    const {dataSearch, isLoading, isError} = useDataList('teachers');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const deleteTeacher = async (record) => {
        setIsSubmitting(true);
        await deleteObject("teachers", record.teacher_id);
        setIsSubmitting(false);
        setShowModal(false);
    };
    const columns = [
        {
            id: 'Código',
            dataIndex: 'teacher_id',
            key: 'teacher_id',
        },
        {
            title: 'Nombre',
            dataIndex: ['teacher','name'],
            key: ['teacher','name'],
        },
        {
            title: 'Apellido',
            dataIndex:['teacher','lastname'],
            key:['teacher','lastname']
        },
        {
            title: 'Profesión',
            dataIndex:'degree',
            key:'degree',
        },
        {
            title: 'Carrera',
            dataIndex: 'career',
            key: 'career'
        },
        {
            title: 'Estado',
            dataIndex:['teacher','status'],
            key:['teacher','status'],
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={()=>{DataSet(record,props.form)}} size="middle">
                        Editar
                    </Button>
                    <Popconfirm title="Desea eliminar el dato?" onConfirm={() => deleteTeacher(record)}>
                        <Button size="middle">Eliminar</Button>
                    </Popconfirm>
                </>
            ),
        },
    ]
    if( isError ) {
        return <ShowError error={ isError } />;
    }
    console.log(dataSearch);
    return (
        <Table
            dataSource={ dataSearch }
            columns={ columns }
            rowKey={ record => record.id }
            loading={ isLoading }
            locale={
                {
                    emptyText: <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }
                                      description={ <span>No hay facultades registradas</span> }
                    />
                }
            }
        />
    );
}

export default TeacherList;
