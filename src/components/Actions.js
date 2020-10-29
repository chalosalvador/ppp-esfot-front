import { Button } from 'antd';
import React, { useContext } from 'react';
import ModalContext from '../context/ModalContext';
import PropTypes from "prop-types";
import TableDefault from "./TableDefault";

const Actions = (props) => {
    const {setShowModal, setEdit, setRegister, setForm} = useContext(ModalContext);
    return (
        <Button data-test="Action" type="primary" onClick={()=>{setEdit(false); setRegister(''); setShowModal(true); setForm(props.form)}}>{props.title}</Button>
    )
}

Actions.propTypes = {
    title: PropTypes.string,
    form: PropTypes.string

}
export default Actions;