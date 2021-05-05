import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Select, Table, Divider, Row, Col, Empty} from 'antd';
import {useDataList} from '../data/useDataList'
import {useCareersList} from "../data/useCareersList";
import ModalContext from '../context/ModalContext';
import TableDefault from "./TableDefault";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import ShowError from "./ShowError";

const { Option } = Select;

const SubjectList = (props) => {
    const [contador, setContador] = useState(0);
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (record, form) => {
        setShowModal(true); setEdit(true); setRegister(record); setForm(form)
    };
    const {dataSearch, isLoading, isError} = useDataList('careers');
    const [currentSubjects, setCurrentSubjects] = useState([]);
    const [currentCareerId, setCurrentCareerId] = useState(null);

    const handleChangeCareer = ( value ) => {
        setCurrentCareerId(value);
        dataSearch.map((career) => {
            if (career.id == value) {
                setCurrentSubjects(career.subjects)
            }
        });
    };

    const columns = [
        {
            id: 'Código',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'NOMBRE',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CODIGO',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'NIVEL',
            dataIndex: 'level',
            key: 'code',
        },
        {
            title: 'UNIDAD',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                <>
                    <div style={{display: 'none'}}>{record['career_id']=currentCareerId}</div>
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
    if( isError ) {
        return <ShowError error={ isError } />;
    }
    return (
        <>
            <Divider orientation="right">
                <Select showSearch style={{ width: 240 }} placeholder='Seleccione una carrera'  onChange={handleChangeCareer} loading={ isLoading } optionFilterProp="children" filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    { dataSearch.map( ( career, i ) => <Option key={ i } value={ career.id }>{ career.name }</Option> ) }
                </Select>
            </Divider>
            <Table
                dataSource={ currentSubjects }
                columns={ columns }
                rowKey={ record => record.id }
                loading={ isLoading }
                locale={
                    {
                        emptyText: <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }
                                          description={ <span>No hay materias registradas</span> }
                        />
                    }
                }
            />
        </>
    );
}

export default SubjectList;
