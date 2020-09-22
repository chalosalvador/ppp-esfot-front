/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, message } from 'antd';
import { EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReportStudentSectionForm from './ReportStudentSectionForm';
import API from '../data';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import { mutate } from 'swr';
import moment from 'moment';

const { confirm } = Modal;

const ReportStudentSectionFormModal = ( { internshipId, report, edit } ) => {
  const [ form ] = Form.useForm();
  const [ showModal, setShowModal ] = useState( false );
  const [ isSubmitting, setIsSubmitting ] = useState( false );

  const handleCreate = async( values ) => {
    confirm( {
        title: '¿Confirmas que deseas enviar el formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'Podrás editar la información enviada solo antes de que el representante de la empresa llene su informe.',
        okText: 'Sí',
        cancelText: 'No',
        onOk: async() => {
          console.log( 'values', values );
          try {
            setIsSubmitting( true );
            await API.post( `/internships/${ internshipId }/internship-reports`, {
              ...values,
              from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
              to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
              recommended_topics: values.recommended_topics && values.recommended_topics[ 0 ] !== ''
                ? values.recommended_topics
                : []
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
        },
        onCancel() {},
      }
    );
  };

  const handleEdit = async( values ) => {
    confirm( {
        title: '¿Confirmas que deseas enviar el formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'Podrás editar la información enviada solo antes de que el representante de la empresa llene su informe.',
        okText: 'Sí',
        cancelText: 'No',
        onOk: async() => {
          console.log( 'values', values );
          try {
            setIsSubmitting( true );
            await API.put( `/internships/${ report.internship_id }/internship-reports/${ report.id }`, {
              ...values,
              from_date: moment( values.dates[ 0 ] ).format( 'YYYY-MM-DD' ),
              to_date: moment( values.dates[ 1 ] ).format( 'YYYY-MM-DD' ),
              recommended_topics: values.recommended_topics && values.recommended_topics[ 0 ] !== ''
                ? values.recommended_topics
                : []
            } );

            await mutate( `/internships/${ report.internship_id }/internship-reports` );
            await mutate( `/internships/${ report.internship_id }/internship-reports/${ report.id }` );
            form.resetFields();
            message.success( 'El reporte se ha guardado correctamente.' );
            setShowModal( false );
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
        width={ 800 }
        closable={ false }
        maskClosable={ false }
        okText='Enviar reporte'
        confirmLoading={ isSubmitting }
        cancelText={ 'Cancelar' }
        onCancel={ handleCancel }
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
