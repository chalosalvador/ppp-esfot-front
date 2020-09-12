/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReportForm from './ReportForm';
import API from '../data';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import { mutate } from 'swr';
import moment from 'moment';

const CreateReportModal = ( { internshipId } ) => {
  const [ form ] = Form.useForm();
  const [ showModal, setShowModal ] = useState( false );

  const handleSubmit = async( values ) => {
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

  return (
    <>
      <Row>
        <Col align='right'>
          <Button type='primary'
                  style={ { marginBottom: 20 } }
                  onClick={ () => setShowModal( true ) }
                  icon={ <PlusOutlined /> }>Nuevo reporte</Button>
        </Col>
      </Row>

      <Modal
        visible={ showModal }
        onCancel={ () => setShowModal( false ) }
        onOk={ () => form.submit() }
        // width={800}
      >
        <ReportForm internshipId={ internshipId } form={ form } onSubmit={ handleSubmit } />
      </Modal>
    </>
  );
};

export default CreateReportModal;
