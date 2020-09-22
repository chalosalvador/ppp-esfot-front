/**
 * Created by chalosalvador on 9/21/20
 */
import React from 'react';
import { Form, Input, Rate } from 'antd';
import { useAuth } from '../providers/Auth';
import { customRateIcons, formItemLayout } from '../utils/form';

const ReportRepresentativeSectionForm = ( { form, onSubmit, ...props } ) => {
  const { currentUser } = useAuth();

  return (
    <Form
      { ...formItemLayout }
      onFinish={ onSubmit }
      form={ form }
      name='report-representative'
      initialValues={ props.report }
    >
      <Form.Item name='evaluation_performance' label='Desempeño' style={ { alignItems: 'center' } } rules={ [
        {
          required: true,
          message: '¿Cuántos búhos le otorgas por su desempeño?'
        }
      ] }>
        <Rate style={ { fontSize: 40 } } allowClear={ false } character={ ( { index } ) => {
          return customRateIcons[ index + 1 ].icon;
        } } />
      </Form.Item>

      <Form.Item name='evaluation_motivation' label='Motivación' style={ { alignItems: 'center' } } rules={ [
        {
          required: true,
          message: '¿Cuántos búhos le otorgas por su motivación?'
        }
      ] }>
        <Rate style={ { fontSize: 40 } } allowClear={ false } character={ ( { index } ) => {
          return customRateIcons[ index + 1 ].icon;
        } } />
      </Form.Item>

      <Form.Item name='evaluation_knowledge' label='Conocimientos' style={ { alignItems: 'center' } } rules={ [
        {
          required: true,
          message: '¿Cuántos búhos le otorgas por sus conocimientos?'
        }
      ] }>
        <Rate style={ { fontSize: 40 } } allowClear={ false } character={ ( { index } ) => {
          return customRateIcons[ index + 1 ].icon;
        } } />
      </Form.Item>

      <Form.Item name='evaluation_punctuality'
                 label='Puntualidad y resposabilidad'
                 style={ { alignItems: 'center' } }
                 rules={ [
                   {
                     required: true,
                     message: '¿Cuántos búhos le otorgas por sus puntualidad y responsabilidad?'
                   }
                 ] }>
        <Rate style={ { fontSize: 40 } } allowClear={ false } character={ ( { index } ) => {
          return customRateIcons[ index + 1 ].icon;
        } } />
      </Form.Item>

      <Form.Item name='evaluation_observations' label='Observaciones y comentarios:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Ingresa observaciones o comentarios generales sobre tu experiencia al recibir a este practicante.',
        },
        {
          min: 40,
          message: 'Debes ingresar al menos 40 caracteres.'
        }
      ] }>
        <Input.TextArea placeholder='Nos interesa conocer tus observaciones o comentarios sobre nuestros estudiantes.'
                        autoSize={ { maxRows: 4 } } />
      </Form.Item>
    </Form>
  );
};

export default ReportRepresentativeSectionForm;
