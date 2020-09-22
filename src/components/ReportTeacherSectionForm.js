/**
 * Created by chalosalvador on 9/21/20
 */
import React from 'react';
import { Form, Input, Rate } from 'antd';
import { useAuth } from '../providers/Auth';
import { customRateIcons, formItemLayout } from '../utils/form';

const ReportTeacherSectionForm = ( { form, onSubmit, ...props } ) => {

  return (
    <Form
      { ...formItemLayout }
      onFinish={ onSubmit }
      form={ form }
      name='report-teacher'
      initialValues={ props.report }
    >
      <Form.Item name='tutor_observations' label='Novedades reportadas por el estudiante/empresa:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Debes ingresar novedades detectadas en el desarrollo de la práctica.',
        },
        {
          min: 40,
          message: 'Debes ingresar al menos 40 caracteres.'
        }
      ] }>
        <Input.TextArea autoSize={ { maxRows: 4 } } />
      </Form.Item>

      <Form.Item name='tutor_followup_actions' label='Actividades de seguimiento ejecutadas:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Debes detallar la manera en que te pusiste en contacto con el estudiante o la empresa.',
        },
        {
          min: 40,
          message: 'Debes ingresar al menos 40 caracteres.'
        }
      ] }>
        <Input.TextArea placeholder='Detalla la manera en que te pusiste en contacto con el estudiante o la empresa.'
                        autoSize={ { maxRows: 4 } } />
      </Form.Item>

      <Form.Item name='tutor_improvement_actions' label='Actividades de mejora:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Debes ingresar las acciones de mejora se pueden llevar a cabo en base a los comentarios recibidos.',
        },
        {
          min: 40,
          message: 'Debes ingresar al menos 40 caracteres.'
        }
      ] }>
        <Input.TextArea placeholder='Que acciones de mejora se pueden llevar a cabo en base a los comentarios recibidos.'
                        autoSize={ { maxRows: 4 } } />
      </Form.Item>
    </Form>
  );
};

export default ReportTeacherSectionForm;
