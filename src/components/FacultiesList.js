import React, {useContext, useEffect, useState} from 'react';
import {Button, Empty, Table, Popconfirm, Input} from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import ShowError from './ShowError';
import {deleteObject} from "../utils/formActions";


const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (record, form) => {
        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
    const {dataSearch, isLoading, isError, setDataSearch} = useDataList('faculties');
    const [dataSource, setDataSource] = useState(dataSearch);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const deleteFaculty = async (record) => {
        setIsSubmitting(true);
        await deleteObject("faculties", record.id);
        setIsSubmitting(false);
        setShowModal(false);
    };

    const FilterByNameInput = (
        <Input
            placeholder="Buscar por nombre"
            value={value}
            onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = dataSearch.filter(entry =>
                    entry.name.includes(currValue)
                );
                setDataSource(filteredData);
            }}
        />
    );

    const columns = [
        {
            id: 'Código',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: FilterByNameInput,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Estado',
            dataIndex:'status',
            key:'status',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <>
                <Button onClick={()=>{DataSet(record,props.form)}} size="middle">
                    Editar
                </Button>
                <Popconfirm title="Desea eliminar el dato?" onConfirm={() => deleteFaculty(record)}>
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
      dataSource={ dataSource }
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

export default FacultiesList;
