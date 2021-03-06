import React, {useContext, useEffect} from 'react';
import { Button, Empty, Table } from 'antd';
import {useDataList} from '../data/useDataList'
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import ShowError from './ShowError';

const FacultiesList = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);

    const DataSet = (record, form) => {

        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };

    const {dataSearch, isLoading, isError} = useDataList('faculties');

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
                                description={ <span>No hay facultades registradas</span> }
              />
          }
      }
    />
    );
}

export default FacultiesList;
