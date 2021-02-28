import React from 'react';
import API from '../data';
import { message } from 'antd';
import { mutate } from 'swr';

export const AddObject = async (url,values) => {
    message.loading( {
        content: 'Guardando los datos',
    });
    console.log('Agregando', values);
    const representative = await API.post( `/${url}`, values);
    console.log(representative);

};

export const EditObject = async (url,values,idObject) => {
    const hide = message.loading( {
        content: 'Editando los datos',
    });
    console.log('Editando', values);
    const representative = await API.put( `/${url}/${idObject}`, values);
    await mutate( `/${url}` );
    hide();
    console.log(representative);

};
