import React, {useContext, useEffect} from 'react';
import { Button, Empty, Table } from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import ShowError from './ShowError';
const CareerList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const {dataSearch, isLoading, isError} = useDataList('careers');

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
            dataIndex: 'faculty_id',
            key: 'faculty_id',
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
    if( isError ) {
        return <ShowError error={ isError } />;
    }
    return (
      <Table
        dataSource={ dataSearch }
        columns={ columns }
        rowKey={ record => record.id }
        // pagination={ pagination }
        loading={ isLoading }
        // onChange={ ( pagination ) => setPageIndex( pagination.current ) }
        locale={
            {
                emptyText: <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }
                                  description={ <span>No hay carreras registradas</span> }
                />
            }
        }
      />
        // <TableDefault columns={columns} title='CARRERAS' dataSource={dataSearch}/>
    )
}

export default CareerList;
