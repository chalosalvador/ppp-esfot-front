import API from '../data';
import { message } from 'antd';
import { mutate } from 'swr';
import { translateMessage } from './translateMessage';
import React from 'react';
import ErrorList from '../components/ErrorList';

export const addObject = async( url, values ) => {
  const hide = message.loading( {
    content: 'Guardando los datos',
  } );
  try {
    console.log( 'Agregando', values );
    await API.post( `/${ url }`, values );
    await mutate( `/${ url }` );
    hide();
  } catch( e ) {
    const errorList = e.error && <ErrorList errors={ e.error } />;
    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    hide();
  }

};

export const editObject = async( url, values, idObject ) => {
  const hide = message.loading( {
    content: 'Editando los datos',
  } );
  try {
    console.log( 'Editando', values );
    await API.put( `/${ url }/${ idObject }`, values );
    await mutate( `/${ url }` );
    hide();
  } catch( e ) {
    const errorList = e.error && <ErrorList errors={ e.error } />;
    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    hide();
  }
};
