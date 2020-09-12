/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react';
import { Form, Button, Input, DatePicker, Select, InputNumber, message } from 'antd';
import API from '../data';
import ErrorList from './ErrorList';
import { translateMessage } from '../utils/translateMessage';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 18,
      offset: 6
    },
  },
};

const ReportForm = ( { form, onSubmit } ) => {

  const disabledDate = ( current ) => current && current > moment().endOf( 'day' );

  return (
    <Form
      { ...formItemLayout }
      onFinish={ onSubmit }
      form={ form }
      name='report'
      initialValues={ { activities: [ '' ] } }
    >
      <Form.Item name='dates' label='Fechas' rules={ [
        {
          required: true,
          message: 'Ingresa las fechas incluidas en este reporte'
        },

      ] }>
        <RangePicker placeholder={ [ 'Inicio', 'Fin' ] } inputReadOnly disabledDate={ disabledDate } />
      </Form.Item>

      <Form.Item label='Área' name='area' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Selecciona el área de la empresa donde desarrollaste tus actividades.'
        }
      ] }>
        <Input />
      </Form.Item>

      <Form.Item label='Horas' name='hours_worked' rules={ [
        {
          required: true,
          message: 'Ingresa la cantidad de horas que vas a reportar.'
        },
        {
          type: 'number',
          message: 'Ingresa un valor numérico.'
        },
      ] }>
        <InputNumber style={ { width: '100%' } } />
      </Form.Item>

      <Form.List name='activities'>
        { ( fields, { add, remove } ) => {
          return (
            <div>
              { fields.map( ( field, index ) => (
                <Form.Item
                  { ...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel) }
                  label={ index === 0
                    ? 'Actividades:'
                    : '' }
                  required={ true }
                  key={ field.key }
                >
                  <Form.Item
                    { ...field }
                    // validateTrigger={ [ 'onChange', 'onBlur' ] }
                    rules={ [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Detalla las actividades desarrolladas durante las prácticas.',
                      },
                    ] }
                    noStyle
                  >
                    <Input.TextArea placeholder='Descripción de la actividad'
                                    autoSize={ { maxRows: 4 } }
                                    style={ { width: '90%' } } />
                  </Form.Item>
                  { fields.length > 1
                    ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        style={ { margin: '0 8px' } }
                        onClick={ () => {
                          remove( field.name );
                        } }
                      />
                    )
                    : null }
                </Form.Item>
              ) ) }
              <Form.Item { ...formItemLayoutWithOutLabel }>
                <Button
                  type='dashed'
                  onClick={ () => {
                    add();
                  } }
                  style={ { width: '90%' } }
                >
                  <PlusOutlined /> Añadir una actividad
                </Button>
              </Form.Item>
            </div>
          );
        } }
      </Form.List>

      <Form.Item name='student_observations' label='Observaciones:' rules={ [
        {
          required: true,
          whitespace: true,
          message: 'Detalla las actividades desarrolladas durante las prácticas.',
        },
      ] }>
        <Input.TextArea placeholder='Observaciones sobre las prácticas que ha realizado en la empresa.'
                        autoSize={ { maxRows: 4 } } />
      </Form.Item>

      {/*<Button type='primary' htmlType='submit'>*/}
      {/*  Submit*/}
      {/*</Button>*/}
    </Form>
  );
};

export default ReportForm;
