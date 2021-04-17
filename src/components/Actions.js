
import { Button } from 'antd';
import React, { useContext } from 'react';
import ModalContext from '../context/ModalContext';
import PropTypes from "prop-types";
import TableDefault from "./TableDefault";

const Actions = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    const DataSet = (form) => {
        setEdit(false); setRegister(''); setShowModal(true); setForm(form)
    }
    return (

        <Button type="primary" onClick={()=>{DataSet(props.form)}}>Nueva Facultad</Button>
    )
}

Actions.propTypes = {
    title: PropTypes.string,
    form: PropTypes.string

}
export default Actions;

