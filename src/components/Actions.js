import { Button } from 'antd';
import React, { useContext } from 'react';
import ModalContext from '../context/ModalContext';

const Actions = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (form) => {
        setEdit(false); setRegister(''); setShowModal(true); setForm(form)
    }
    return (
        <Button type="primary" onClick={()=>{DataSet(props.form)}}>Nueva Facultad</Button>
    )
}

export default Actions;