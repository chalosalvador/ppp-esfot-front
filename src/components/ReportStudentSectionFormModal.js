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

const ReportStudentSectionFormModal = ( { internshipId, report, edit } ) => {
  const [ form ] = Form.useForm();
  const [ showModal, setShowModal ] = useState( false );
  const [ isSubmitting, setIsSubmitting ] = useState( false );

  const handleCreate = async( values ) => {
    console.log( 'values', values );
    try {
      setIsSubmitting( true );
      await API.post( `/internships/${ internshipId }/internship-reports`, {
        ...values,
        from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
        to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
      } );

      await mutate( `/internships/${ internshipId }/internship-reports` );
      setShowModal( false );
      form.resetFields();
      message.success( 'El reporte se ha guardado correctamente.' );
    } catch( e ) {
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
    setIsSubmitting( false );
  };

  const handleEdit = async( values ) => {
    console.log( 'values', values );
    try {
      setIsSubmitting( true );
      await API.put( `/internships/${ report.internship_id }/internship-reports/${ report.id }`, {
        ...values,
        from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
        to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
      } );

      await mutate( `/internships/${ report.internship_id }/internship-reports` );
      await mutate( `/internships/${ report.internship_id }/internship-reports/${ report.id }` );
      setShowModal( false );
      form.resetFields();
      message.success( 'El reporte se ha guardado correctamente.' );
    } catch( e ) {
      const errorList = e.error && <ErrorList errors={ e.error } />;
      message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
    }
    setIsSubmitting( false );
  };

  return (
    <>
      {
        <Row>
          <Col align='right'>
            {
              !edit
                ? <Button type='primary'
                          style={ { marginBottom: 20 } }
                          onClick={ () => setShowModal( true ) }
                          icon={ <PlusOutlined /> }>Nuevo reporte</Button>
                : <Button onClick={ () => setShowModal( true ) }
                          icon={ <EditOutlined /> }>Editar</Button>
            }
          </Col>
        </Row>
      }

      <Modal
        title={ `${ !edit
          ? 'Nuevo'
          : 'Editar' } reporte de prácticas` }
        visible={ showModal }
        closable={ false }
        maskClosable={ false }
        okText='Enviar reporte'
        confirmLoading={ isSubmitting }
        cancelText={ 'Cancelar' }
        onCancel={ () => {
          form.resetFields();
          setShowModal( false );
        } }
        onOk={ () => form.submit() }>
        {
          !edit
            ? <ReportStudentSectionForm form={ form } onSubmit={ handleCreate } internshipId={ internshipId } />
            : <ReportStudentSectionForm form={ form } onSubmit={ handleEdit } report={ report } />
        }
      </Modal>
    </>
  );
};

export default ReportStudentSectionFormModal;
