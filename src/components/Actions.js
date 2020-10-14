import { Button } from 'antd';
import React, { useContext } from 'react';
import ModalContext from '../context/ModalContext';

const Actions = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    return (
        <Button type="primary" onClick={()=>{setEdit(false); setRegister(''); setShowModal(true); setForm(props.form)}}>{props.title}</Button>
    )
}

export default Actions;