import React, { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import API from '../data';
import { Form,Button, Input, message } from 'antd';

const Add = (url, setIsSubmitting) => {
    const {setShowModal} = useContext(ModalContext);

    const addCarrier = async (values) => {
        setIsSubmitting(true);
        message.loading( {
            content: 'Guardando los datos',
        });
        console.log('Agregando', values);
        const representative = await API.post( `${url}`, values);
        console.log(representative);
        setIsSubmitting(false);
        setShowModal(false);

    }

    return setIsSubmitting
}

export default Add;