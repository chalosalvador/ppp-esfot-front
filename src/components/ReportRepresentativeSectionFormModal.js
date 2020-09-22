/**
 * Created by chalosalvador on 9/21/20
 */
import React, { useState } from 'react';
import { Button, Col, Form, message, Modal, Row } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import API from '../data';
import { mutate } from 'swr';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import ReportRepresentativeSectionForm from './ReportRepresentativeSectionForm';

const { confirm } = Modal;

const ReportRepresentativeSectionFormModal = ( { internshipId, report } ) => {
  const [ form ] = Form.useForm();
  const [ showModal, setShowModal ] = useState( false );
  const [ isSubmitting, setIsSubmitting ] = useState( false );

  const handleComplete = async( values ) => {
    confirm( {
        title: '¿Confirmas que deseas enviar el formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'No podrás editar esta información una vez que la envíes.',
        okText: 'Sí',
        cancelText: 'No',
        onOk: async() => {
          console.log( 'values', values );
          try {
            setIsSubmitting( true );
            await API.post( `/internships/${ report.internship_id }/internship-reports/${ report.id }/representative`, values );

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
        },
        onCancel() {},
      }
    );
  };

  const handleCancel = () => {
    if( form.isFieldsTouched() ) {
      confirm( {
        title: '¿Confirmas que deseas cerrar el formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'Se perderá toda la información ingresada.',
        okText: 'Sí',
        cancelText: 'No',
        onOk() {
          form.resetFields();
          setShowModal( false );
        },
        onCancel() {},
      } );
    } else {
      setShowModal( false );
    }
  };

  return (
    <>
      {
        <Row>
          <Col align='right'>
            {
              <Button type='primary'
                      style={ { marginBottom: 20 } }
                      onClick={ () => setShowModal( true ) }
                      icon={ <PlusOutlined /> }>Completar reporte</Button>
            }
          </Col>
        </Row>
      }

      <Modal
        title={ 'Completar reporte de prácticas' }
        visible={ showModal }
        width={ 800 }
        closable={ false }
        maskClosable={ false }
        okText='Enviar reporte'
        confirmLoading={ isSubmitting }
        cancelText={ 'Cancelar' }
        onCancel={ handleCancel }
        onOk={ () => form.submit() }>
        <ReportRepresentativeSectionForm form={ form } onSubmit={ handleComplete } internshipId={ internshipId } />
      </Modal>
    </>
  );
};

export default ReportRepresentativeSectionFormModal;
