/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, message } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ReportStudentSectionForm from './ReportStudentSectionForm';
import API from '../data';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import { mutate } from 'swr';
import moment from 'moment';

const ReportStudentSectionFormModal = ( { internshipId, report, ...props } ) => {
  const [ form ] = Form.useForm();
  const [ showModal, setShowModal ] = useState( false );

  const handleCreate = async( values ) => {
    console.log( 'values', values );
    try {
      await API.post( `/internships/${ internshipId }/internship-reports`, {
        ...values,
        from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
        to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
      } );

      await mutate( `/internships/${ internshipId }/internship-reports` );
      setShowModal( false );
      message.success( 'El reporte se ha guardado correctamente.' );
    } catch( e ) {
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
  };

  const handleEdit = async( values ) => {
    console.log( 'values', values );
    try {
      await API.put( `/internships/${ report.internship_id }/internship-reports/${ report.id }`, {
        ...values,
        from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
        to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
      } );

      await mutate( `/internships/${ report.internship_id }/internship-reports` );
      await mutate( `/internships/${ report.internship_id }/internship-reports/${ report.id }` );
      setShowModal( false );
      message.success( 'El reporte se ha guardado correctamente.' );
    } catch( e ) {
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
  };

  return (
    <>
      <Row>
        <Col align='right'>
          {
            !props.edit
              ? <Button type='primary'
                        style={ { marginBottom: 20 } }
                        onClick={ () => setShowModal( true ) }
                        icon={ <PlusOutlined /> }>Nuevo reporte</Button>
              : <Button onClick={ () => setShowModal( true ) }
                        icon={ <EditOutlined /> }>Editar</Button>
          }
        </Col>
      </Row>

      <Modal
        visible={ showModal }
        onCancel={ () => setShowModal( false ) }
        onOk={ () => form.submit() }>
        {
          !props.edit
            ? <ReportStudentSectionForm internshipId={ internshipId } form={ form } onSubmit={ handleCreate } />
            : <ReportStudentSectionForm report={ report } form={ form } onSubmit={ handleEdit } />
        }
      </Modal>
    </>
  );
};

export default ReportStudentSectionFormModal;
